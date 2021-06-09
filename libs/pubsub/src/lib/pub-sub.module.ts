import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import * as redis from "redis";
import { ScrapeJobCountService } from "./scrape-job-count/scrape-job-count.service";

const RedisPublisherProvider = {
  provide: "REDIS_PUB",
  useFactory: async () => {
    return redis.createClient({
      host: "localhost",
      port: 6379,
    });
  },
};

const RedisSubcriberProvider = {
  provide: "REDIS_SUB",
  useFactory: async () => {
    return redis.createClient({
      host: "localhost",
      port: 6379,
    });
  },
};

@Module({
  imports: [OrmModule, OrmModule.Register()],
  providers: [RedisPublisherProvider, RedisSubcriberProvider, ScrapeJobCountService],
  exports: [RedisPublisherProvider, RedisSubcriberProvider, ScrapeJobCountService],
})
export class PubSubModule {}
