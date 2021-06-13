import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { ScrapeQueue, SCRAPE_QUEUE_NAME } from "./scrape-queue.constants";

@Injectable()
export class ScrapeQueueService {
  constructor(
    @InjectQueue(SCRAPE_QUEUE_NAME)
    private readonly queue: Queue
  ) {}

  addIndex(id) {
    this.queue.add(ScrapeQueue.content, { id });
  }

  addContent(id, jobId) {
    this.queue.add(ScrapeQueue.content, { id, jobId });
  }
}
