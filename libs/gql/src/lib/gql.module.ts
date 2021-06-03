import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { OrmModule } from "@web-scraping/orm";
import { ScrapeQueueModule } from "@web-scraping/scrape-queue";
import { join } from "path";
import { GqlConfigModule } from "./config/gql-config.module";
import { DomainResolver } from "./resolvers/domain/domain.resolver";
import { LinkResolver } from "./resolvers/link/link.resolver";
import { DomainSettingResolver } from "./resolvers/domain-setting/domain-setting.resolver";
import { ContentResolver } from "./resolvers/content/content.resolver";
import { ScraperResolver } from "./resolvers/scraper/scraper.resolver";
import { ScrapeJobResolver } from "./resolvers/scrape-job/scrape-job.resolver";

@Module({
  imports: [
    OrmModule,
    OrmModule.Register(),
    ScrapeQueueModule,
    ScrapeQueueModule.Register(),
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
    DomainSettingResolver,
    LinkResolver,
    ScrapeJobResolver,
    ScraperResolver,
  ],
})
export class GqlModule {}
