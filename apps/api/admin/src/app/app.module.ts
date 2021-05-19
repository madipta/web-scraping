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
import { ContentController } from "./content/content.controller";
import { DomainSettingController } from "./domain-setting/domain-setting.controller";
import { DomainController } from "./domain/domain.controller";
import { LinkController } from "./link/link.controller";
import { ScrapingController } from "./scraping/scraping.controller";

@Module({
  imports: [
    OrmModule,
    TypeOrmModule.forFeature([Domain, DomainSetting, Link, Content]),
    WebScraperModule,
  ],
  controllers: [
    AppController,
    ContentController,
    DomainController,
    DomainSettingController,
    LinkController,
    ScrapingController,
  ],
  providers: [AppService],
})
export class AppModule {}
