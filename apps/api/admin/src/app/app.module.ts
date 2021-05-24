import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Content,
  Domain,
  DomainSetting,
  Link,
  OrmModule,
} from "@web-scraping/orm";
import { WebScraperModule } from "@web-scraping/scraper";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ScrapingController } from "./scraping/scraping.controller";
import { GqlModule } from "@web-scraping/gql";

@Module({
  imports: [
    OrmModule,
    TypeOrmModule.forFeature([Domain, DomainSetting, Link, Content]),
    WebScraperModule,
    GqlModule,
  ],
  controllers: [
    AppController,
    ScrapingController,
  ],
  providers: [AppService],
})
export class AppModule {}
