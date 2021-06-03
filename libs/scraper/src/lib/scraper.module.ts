import { Module } from "@nestjs/common";
import { OrmModule } from "@web-scraping/orm";
import { ScraperService } from "./scraper.service";

@Module({
  imports: [OrmModule, OrmModule.Register()],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
