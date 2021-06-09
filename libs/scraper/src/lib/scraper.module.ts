import { Module } from "@nestjs/common";
import { PubSubModule } from "@web-scraping/pubsub";
import { OrmModule } from "@web-scraping/orm";
import { ScraperService } from "./scraper.service";

@Module({
  imports: [OrmModule, OrmModule.Register(), PubSubModule],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
