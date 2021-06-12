import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Link, Content, ScrapeJob } from "@web-scraping/orm";
import { ScrapeJobCountService } from "@web-scraping/pubsub";
import { Repository } from "typeorm";

@Injectable()
export class ScraperEvent {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>,
    private readonly scrapeJobCountService: ScrapeJobCountService
  ) {}

  @OnEvent("error.loading")
  async onErrorLoading({ linkId, jobId }) {
    this.linkRepo.update({ id: linkId }, { scraped: false, broken: true });
    await this.scrapeJobRepo.update(
      { id: jobId },
      { status: "loading-failed" }
    );
    this.scrapeJobCountService.publishScrapeJobCount();
  }

  @OnEvent("success.loading")
  async onSuccessLoading({ linkId }) {
    await this.linkRepo.update(
      { id: linkId },
      { scraped: true, broken: false }
    );
  }

  @OnEvent("error.scraping")
  async onErrorScraping({ linkId, jobId }) {
    this.linkRepo.update({ id: linkId }, { scraped: false, broken: false });
    await this.scrapeJobRepo.update(
      { id: jobId },
      { status: "scraping-failed" }
    );
    this.scrapeJobCountService.publishScrapeJobCount();
  }

  @OnEvent("success.scraping")
  async onSuccessScraping({ linkId, jobId, content }) {
    if (await this.contentRepo.count({ id: linkId })) {
      await this.contentRepo.update({ id: linkId }, content);
    } else {
      await this.contentRepo.save({ ...content, id: linkId });
    }
    await this.scrapeJobRepo
      .createQueryBuilder()
      .update()
      .set({
        status: "success",
        finishedAt: () => "Now()",
      })
      .where(`id=:id`, { id: jobId })
      .execute();
    this.scrapeJobCountService.publishScrapeJobCount();
  }
}
