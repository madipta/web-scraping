import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PubSubModule } from "@web-scraping/pubsub";
import { OrmModule } from "@web-scraping/orm";
import { ScraperService } from "./scraper.service";
import { ContentManagerService } from "./content/content-manager";
import { ScraperEvent } from "./scraper.event";

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    OrmModule,
    OrmModule.Register(),
    PubSubModule,
  ],
  providers: [ContentManagerService, ScraperEvent, ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
