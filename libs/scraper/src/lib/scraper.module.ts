import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  OrmModule,
  Domain,
  Link,
  Content,
  DomainSetting,
} from "@web-scraping/orm";
import { ScraperService } from "./scraper.service";

@Module({
  imports: [
    OrmModule,
    TypeOrmModule.forFeature([Domain, DomainSetting, Link, Content]),
  ],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class WebScraperModule {}
