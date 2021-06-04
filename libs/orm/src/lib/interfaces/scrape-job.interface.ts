import { ScrapeJobStatusType } from "../entities/scrape-job.entity";

export interface IScrapeJob {
  id: string;
  linkId: number;
  status: ScrapeJobStatusType;
  createdAt?: Date;
  finishedAt?: Date;
}
