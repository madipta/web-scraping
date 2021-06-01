import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Content,
  Domain,
  DomainSetting,
  Link,
  OrmModule,
  ScrapeJob,
} from "@web-scraping/orm";
import { WebScraperModule } from "@web-scraping/scraper";
import { join } from "path";
import { GqlConfigModule } from "./config/gql-config.module";
import { DomainResolver } from "./resolvers/domain/domain.resolver";
import { LinkResolver } from "./resolvers/link/link.resolver";
import { DomainSettingResolver } from "./resolvers/domain-setting/domain-setting.resolver";
import { ContentResolver } from "./resolvers/content/content.resolver";
import { ScraperResolver } from "./resolvers/scraper/scraper.resolver";
import { ScrapJobResolver } from './resolvers/scrap-job/scrap-job.resolver';

@Module({
  imports: [
    OrmModule,
    TypeOrmModule.forFeature([Content, Domain, DomainSetting, Link, ScrapeJob]),
    WebScraperModule,
    GraphQLModule.forRootAsync({
      imports: [GqlConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        playground: cfg.get<boolean>("gql_playground"),
        installSubscriptionHandlers: cfg.get<boolean>("gql_subcription"),
        autoSchemaFile: join(process.cwd(), "dist/schema.gql"),
      }),
    }),
  ],
  providers: [
    ContentResolver,
    DomainResolver,
    LinkResolver,
    DomainSettingResolver,
    ScraperResolver,
    ScrapJobResolver,
  ],
})
export class GqlModule {}
