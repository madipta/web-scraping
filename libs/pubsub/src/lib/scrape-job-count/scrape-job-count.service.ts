import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScrapeJob } from "@web-scraping/orm";
import { PubSub } from "graphql-subscriptions";
import { RedisClient } from "redis";
import { Repository } from "typeorm";

const pubSub = new PubSub();

@Injectable()
export class ScrapeJobCountService {
  readonly JOB_NAME = "ScrapeJobCount";

  constructor(
    @Inject("REDIS_PUB")
    private readonly redisPubsub: RedisClient,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>
  ) {}

  async getScrapeJobCountQuery() {
    return this.scrapeJobRepo.query(`
      SELECT COUNT(id) FROM content
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'created'
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'loading-error'
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'scraping-error'
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'success'
  `);
  }

  async getScrapeJobCount() {
    const res: { count: number }[] = await this.getScrapeJobCountQuery();
    return {
      content: res[0].count,
      created: res[1].count,
      loadingError: res[2].count,
      scrapingError: res[3].count,
      success: res[4].count,
    };
  }

  async publishScrapeJobCount() {
    const result = await this.getScrapeJobCount();
    const res = this.redisPubsub.emit(this.JOB_NAME, result);
    console.log("publishScrapeJobCount", res);
    pubSub.publish(this.JOB_NAME, {
      scrapeJobCount: result,
    });
    return result;
  }

  asyncIteratorScrapeJobCount() {
    return pubSub.asyncIterator(this.JOB_NAME);
  }
}
