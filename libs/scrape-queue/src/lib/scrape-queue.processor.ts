import { Process, Processor } from "@nestjs/bull";
import { ScraperService } from "@web-scraping/scraper";
import { Job } from "bull";

@Processor("scrape")
export class ScrapeQueueProcessor {
  constructor(private readonly scraper: ScraperService) {}

  @Process("index")
  async scrapeIndex(job: Job) {
    return await this.scraper.index(job.data.id);
  }
  
  @Process("content")
  async scrapeContent(job: Job) {
    return await this.scraper.content(job.data.id);
  }
}
