import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScrapeJob } from "@web-scraping/orm";
import { PubSub } from "graphql-subscriptions";
import { RedisClient } from "redis";
import { Repository } from "typeorm";
import { PUBSUB_EVENTS, PUBSUB_PROVIDER } from "../pub-sub.constants";

const gqlPubSub = new PubSub();

@Injectable()
export class ScrapeJobCountService {
  constructor(
    @Inject(PUBSUB_PROVIDER)
    private readonly redisPubsub: RedisClient,
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>
  ) {}

  async getScrapeJobCountQuery() {
    return this.scrapeJobRepo.query(`
      SELECT COUNT(id) FROM domain
      UNION ALL
      SELECT COUNT(id) FROM content
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'created'
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'loading-failed'
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'scraping-failed'
      UNION ALL
      SELECT COUNT(id) FROM scrape_job where status = 'success'
  `);
  }

  async getScrapeJobCount() {
    const res: { count: number }[] = await this.getScrapeJobCountQuery();
    return {
      domain: res[0].count,
      content: res[1].count,
      created: res[2].count,
      loadingError: res[3].count,
      scrapingError: res[4].count,
      success: res[5].count,
    };
  }

  async publishScrapeJobCount() {
    const data = await this.getScrapeJobCount();
    this.redisPubsub.emit(PUBSUB_EVENTS.JOB, {
      event: "jobCount",
      data,
    });
    gqlPubSub.publish(PUBSUB_EVENTS.JOB, {
      scrapeJobCount: data,
    });
    return data;
  }

  asyncIteratorScrapeJobCount() {
    return gqlPubSub.asyncIterator(PUBSUB_EVENTS.JOB);
  }
}
