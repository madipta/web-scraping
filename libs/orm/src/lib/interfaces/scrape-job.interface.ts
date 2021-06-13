import { ScrapeJobStatus } from "../entities/scrape-job.entity";

export interface IScrapeJob {
  id: string;
  linkId: number;
  status: ScrapeJobStatus;
  createdAt?: Date;
  finishedAt?: Date;
}
