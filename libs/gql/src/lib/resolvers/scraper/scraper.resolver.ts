import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { ScrapeJobCount, ScrapeJobCountService } from "@web-scraping/pubsub";
import {
  Domain,
  DomainSetting,
  Link,
  ScrapeJob,
  ScrapeJobStatus,
} from "@web-scraping/orm";
import { Repository } from "typeorm";
import { AutoNumberInput } from "../core/auto-number-input";
import { BaseResult } from "../core/base-result";
import { ScrapeQueueService } from "@web-scraping/scrape-queue";
import { Role } from "@web-scraping/auth";

@Resolver()
export class ScraperResolver {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(DomainSetting)
    private readonly settingRepo: Repository<DomainSetting>,
    @InjectRepository(Link)
    private readonly linkRepo: Repository<Link>,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>,
    private readonly scrapeJobCountService: ScrapeJobCountService,
    private readonly scrapeQueueService: ScrapeQueueService
  ) {}

  @Role("any")
  @Query(() => Boolean)
  async initJobCount() {
    await this.scrapeJobCountService.publishScrapeJobCount();
    return true;
  }

  @Role("any")
  @Mutation(() => BaseResult)
  async scrapeIndex(@Args("input") dto: AutoNumberInput): Promise<BaseResult> {
    try {
      const domain = await this.domainRepo.findOne(dto.id);
      const domainSetting = await this.settingRepo.findOne(dto.id);
      const url = domain.home + domainSetting.indexUrl;
      const { id: jobId } = await this.scrapeJobRepo.save({
        url,
        status: ScrapeJobStatus.created,
      });
      this.scrapeQueueService.addIndex(dto.id, jobId);
      this.scrapeJobCountService.publishScrapeJobCount();
      return { ok: true };
    } catch (e) {
      console.error("[ScraperResolver | scrapIndex]", e);
      return { ok: false };
    }
  }

  @Role("any")
  @Mutation(() => BaseResult)
  async scrapeContent(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    try {
      const link = await this.linkRepo.findOne(dto.id);
      const { id: jobId } = await this.scrapeJobRepo.save({
        url: link.url,
        status: ScrapeJobStatus.created,
      });
      this.scrapeQueueService.addContent(dto.id, jobId);
      this.scrapeJobCountService.publishScrapeJobCount();
      return { ok: true };
    } catch (e) {
      console.error("[ScraperResolver | scrapeContent]", e);
      return { ok: false };
    }
  }

  @Role("any")
  @Mutation(() => BaseResult)
  async scrapeContentByDomain(
    @Args("input") dto: AutoNumberInput
  ): Promise<BaseResult> {
    try {
      const links = await this.linkRepo.find({
        where: {
          domainId: dto.id,
        },
      });
      links
        .filter((link) => !link.scraped)
        .forEach((link) => {
          this.scrapeContent({ id: link.id });
        });
      return { ok: true };
    } catch (e) {
      console.error("[ScraperResolver | scrapeContentByDomain]", e);
      return { ok: false };
    }
  }

  @Subscription(() => ScrapeJobCount)
  scrapeJobCount() {
    return this.scrapeJobCountService.asyncIteratorScrapeJobCount();
  }
}
