import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmModule, Domain, Link, Content } from "@web-scraping/orm";
import { WebIndexService } from "./web-index/web-index.service";
import { WebContentService } from "./web-content/web-content.service";
import { ContentService } from './content/content.service';
import { ScraperService } from "./scraper.service";

@Module({
  imports: [OrmModule, TypeOrmModule.forFeature([Domain, Link, Content])],
  providers: [WebIndexService, WebContentService, ScraperService, ContentService],
  exports: [WebIndexService, WebContentService, ScraperService],
})
export class WebScraperModule {}
