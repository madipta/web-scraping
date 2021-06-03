import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ScraperModule } from "@web-scraping/scraper";
import { ScrapeQueueConfigModule } from "./config/config.module";
import { ScrapeQueueProcessor } from "./scrape-queue.processor";

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
  ],
  providers: [ScrapeQueueProcessor],
})
export class ScrapeQueueModule {
  static Register() {
    return BullModule.registerQueue({
      name: "scrape",
    });
  }
}
