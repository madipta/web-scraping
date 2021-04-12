import { Module } from "@nestjs/common";
import { DataAccessModule } from "@web-scraping/data-access";
import { ContentService } from "./content/content.service";
import { IndexService } from "./index/index.service";

@Module({
  imports: [DataAccessModule],
  providers: [ContentService, IndexService],
  exports: [ContentService, IndexService],
})
export class ScrapingModule {}
