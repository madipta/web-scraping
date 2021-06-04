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
    const { id, jobId } = job.data;
    return await this.scraper.content(id, jobId);
  }
}
