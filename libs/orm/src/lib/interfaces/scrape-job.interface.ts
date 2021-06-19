import { ScrapeJobStatus } from "../entities/scrape-job.entity";

export interface IScrapeJob {
  id: string;
  url: string;
  status: ScrapeJobStatus;
  createdAt?: Date;
  finishedAt?: Date;
}
