import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import * as redis from "redis";
import { PUBSUB_PROVIDER } from "./pub-sub.constants";
import { ScrapeJobCountService } from "./scrape-job-count/scrape-job-count.service";
import { ScrapeJobFinishService } from "./scrape-job-finish/scrape-job-finish.service";

const RedisPubSubClientProvider = {
  provide: PUBSUB_PROVIDER,
  useFactory: async () => {
    return redis.createClient({
      host: "localhost",
      port: 6379,
    });
  },
};

const providers = [
  RedisPubSubClientProvider,
  ScrapeJobCountService,
  ScrapeJobFinishService,
];

@Module({
  imports: [OrmModule, OrmModule.Register()],
  providers: [...providers],
  exports: [...providers],
})
export class PubSubModule {}
