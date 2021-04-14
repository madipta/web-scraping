import { Module } from "@nestjs/common";
import { DataAccessModule } from "@web-scraping/data-access";
import { WebIndexService } from "./web-index/web-index.service";
import { WebContentService } from './web-content/web-content.service';

@Module({
  imports: [DataAccessModule],
  providers: [WebIndexService, WebContentService],
  exports: [WebIndexService, WebContentService],
})
export class WebScraperModule {}
