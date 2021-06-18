import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, Content, ScrapeJob, ScrapeJobStatus } from "@web-scraping/orm";
import {
  ScrapeJobCountService,
  ScrapeJobFinishService,
} from "@web-scraping/pubsub";
import { Repository } from "typeorm";
import { IIndexScrapResult } from "./index/scrapers/index-scrap.interface";

export enum ScrapeEvents {
  ErrorLoading = "error.loading",
  SuccessLoading = "success.loading",
  ErrorScraping = "error.scraping",
  SuccessScraping = "success.scraping",
  SuccessIndexScraping = "success.index.scraping",
}

@Injectable()
export class ScraperEvent {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>,
    private readonly scrapeJobFinishService: ScrapeJobFinishService,
    private readonly scrapeJobCountService: ScrapeJobCountService
  ) {}

  @OnEvent(ScrapeEvents.SuccessIndexScraping)
  async onSSuccessIndexScraping(links: IIndexScrapResult[]) {
    await Promise.all(
      links.map(async (link) => {
        const count = await this.linkRepo.count({ url: link.url });
        if (!count) {
          this.linkRepo.save({ ...link });
        }
      })
    );
    this.scrapeJobCountService.publishScrapeJobCount();
    this.scrapeJobFinishService.scrapeIndexJobFinished();
  }

  @OnEvent(ScrapeEvents.ErrorLoading)
  async onErrorLoading({ linkId, jobId }) {
    this.linkRepo.update({ id: linkId }, { scraped: false, broken: true });
    await this.scrapeJobRepo.update(
      { id: jobId },
      { status: ScrapeJobStatus.loadingFailed }
    );
    this.scrapeJobCountService.publishScrapeJobCount();
  }

  @OnEvent(ScrapeEvents.SuccessLoading)
  async onSuccessLoading({ linkId }) {
    await this.linkRepo.update(
      { id: linkId },
      { scraped: true, broken: false }
    );
  }

  @OnEvent(ScrapeEvents.ErrorScraping)
  async onErrorScraping({ linkId, jobId }) {
    this.linkRepo.update({ id: linkId }, { scraped: false, broken: false });
    await this.scrapeJobRepo.update(
      { id: jobId },
      { status: ScrapeJobStatus.scrapingFailed }
    );
    this.scrapeJobCountService.publishScrapeJobCount();
  }

  @OnEvent(ScrapeEvents.SuccessScraping)
  async onSuccessScraping({ linkId, jobId, content }) {
    const { title } = await this.linkRepo.findOne(linkId);
    content = { ...content, title };
    if (await this.contentRepo.count({ id: linkId })) {
      await this.contentRepo.update({ id: linkId }, content);
    } else {
      await this.contentRepo.save({ ...content, id: linkId });
    }
    await this.scrapeJobRepo
      .createQueryBuilder()
      .update()
      .set({
        status: ScrapeJobStatus.success,
        finishedAt: () => "Now()",
      })
      .where(`id=:id`, { id: jobId })
      .execute();
    this.scrapeJobCountService.publishScrapeJobCount();
  }
}
