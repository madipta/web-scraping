import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmModule, Domain, Link, Content } from "@web-scraping/orm";
import { WebIndexService } from "./web-index/web-index.service";
import { ContentService } from './content/content.service';
import { ScraperService } from "./scraper.service";

@Module({
  imports: [OrmModule, TypeOrmModule.forFeature([Domain, Link, Content])],
  providers: [WebIndexService, ScraperService, ContentService],
  exports: [WebIndexService, ScraperService],
})
export class WebScraperModule {}
