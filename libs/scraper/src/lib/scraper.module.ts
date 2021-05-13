import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrmModule, Domain, Link, Content } from "@web-scraping/orm";
import { WebIndexService } from "./web-index/web-index.service";
import { WebContentService } from "./web-content/web-content.service";

@Module({
  imports: [OrmModule, TypeOrmModule.forFeature([Domain, Link, Content])],
  providers: [WebIndexService, WebContentService],
  exports: [WebIndexService, WebContentService],
})
export class WebScraperModule {}
