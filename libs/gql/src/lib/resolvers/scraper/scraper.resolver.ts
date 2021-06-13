import { Args, Mutation, Resolver, Subscription } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { ScrapeJobCount, ScrapeJobCountService } from "@web-scraping/pubsub";
import { Link, ScrapeJob, ScrapeJobStatus } from "@web-scraping/orm";
import { Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";
import { ScrapeQueueService } from "@web-scraping/scrape-queue";

@Resolver()
export class ScraperResolver {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>,
    private readonly scrapeJobCountService: ScrapeJobCountService,
    private readonly scrapeQueueService: ScrapeQueueService
  ) {}

  @Mutation(() => BaseResult)
  async scrapeIndex(@Args("input") dto: AutoNumberInput): Promise<BaseResult> {
    try {
      this.scrapeQueueService.addIndex(dto.id);
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @Mutation(() => BaseResult)
  async scrapeContent(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    try {
      const { id: jobId } = await this.scrapeJobRepo.save({
        linkId: dto.id,
        status: ScrapeJobStatus.created,
      });
      this.scrapeQueueService.addContent(dto.id, jobId);
      this.scrapeJobCountService.publishScrapeJobCount();
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @Mutation(() => BaseResult)
  async scrapeContentByDomain(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    try {
      const links = await this.linkRepo.find({
        where: {
          domainId: dto.id,
          scraped: null,
        },
      });
      links.forEach((link) => {
        this.scrapeContent({ id: link.id });
      });
      return { ok: true };
    } catch {
      return { ok: false };
    }
  }

  @Subscription(() => ScrapeJobCount)
  scrapeJobCount() {
    return this.scrapeJobCountService.asyncIteratorScrapeJobCount();
  }
}
