import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import { Redis } from "ioredis";
import { PUBSUB_PROVIDER } from "./pub-sub.constants";
import { ScrapeJobCountService } from "./scrape-job-count/scrape-job-count.service";

const RedisPubSubClientProvider = {
  provide: PUBSUB_PROVIDER,
  useFactory: async () => {
    return new Redis({
      host: "localhost",
      port: 6379,
    });
  },
};

const providers = [
  RedisPubSubClientProvider,
  ScrapeJobCountService,
];

@Module({
  imports: [OrmModule, OrmModule.Register()],
  providers: [...providers],
  exports: [...providers],
})
export class PubSubModule {}
