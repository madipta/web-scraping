import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "@web-scraping/auth";
import { PubSubModule } from "@web-scraping/pubsub";
import { OrmModule } from "@web-scraping/orm";
import { ScrapeQueueModule } from "@web-scraping/scrape-queue";
import { GqlConfigModule } from "./config/gql-config.module";
import { DomainResolver } from "./resolvers/domain/domain.resolver";
import { LinkResolver } from "./resolvers/link/link.resolver";
import { DomainSettingResolver } from "./resolvers/domain-setting/domain-setting.resolver";
import { ContentResolver } from "./resolvers/content/content.resolver";
import { ScraperResolver } from "./resolvers/scraper/scraper.resolver";
import { ScrapeJobResolver } from "./resolvers/scrape-job/scrape-job.resolver";
import { UserResolver } from "./resolvers/user/user.resolver";

@Module({
  imports: [
    OrmModule,
    OrmModule.Register(),
    AuthModule,
    ScrapeQueueModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [GqlConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        autoSchemaFile: true,
        installSubscriptionHandlers: cfg.get<boolean>("gql_subcription"),
        playground: cfg.get<boolean>("gql_playground"),
      }),
    }),
    PubSubModule,
  ],
  providers: [
    ContentResolver,
    DomainResolver,
    DomainSettingResolver,
    LinkResolver,
    ScrapeJobResolver,
    ScraperResolver,
    UserResolver,
  ],
})
export class GqlModule {}
