import { Process, Processor } from "@nestjs/bull";
import { ScraperService } from "@web-scraping/scraper";
import { Job } from "bull";
import { ScrapeQueue, SCRAPE_QUEUE_NAME } from "./scrape-queue.constants";

@Processor(SCRAPE_QUEUE_NAME)
export class ScrapeQueueProcessor {
  constructor(private readonly scraper: ScraperService) {}

  @Process(ScrapeQueue.index)
  async scrapeIndex(job: Job) {
    return await this.scraper.index(job.data.id);
  }

  @Process(ScrapeQueue.content)
  async scrapeContent(job: Job) {
    const { id, jobId } = job.data;
    return await this.scraper.content(id, jobId);
  }
}
