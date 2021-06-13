import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ScraperModule } from "@web-scraping/scraper";
import { ScrapeQueueConfigModule } from "./config/config.module";
import { SCRAPE_QUEUE_NAME } from "./scrape-queue.constants";
import { ScrapeQueueProcessor } from "./scrape-queue.processor";
import { ScrapeQueueService } from "./scrape-queue.service";

@Module({
  imports: [
    ScraperModule,
    BullModule.forRootAsync({
      imports: [ScrapeQueueConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get("redis_queue_host"),
          port: configService.get("redis_queue_port"),
        },
      }),
    }),
    BullModule.registerQueue({
      name: SCRAPE_QUEUE_NAME,
    }),
  ],
  providers: [ScrapeQueueProcessor, ScrapeQueueService],
  exports: [ScrapeQueueService],
})
export class ScrapeQueueModule {}
