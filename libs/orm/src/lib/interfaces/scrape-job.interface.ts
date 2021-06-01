import { ScrapeJobStatusType } from "@web-scraping/orm";

export interface IScrapeJob {
  id: string;
  linkId: number;
  status: ScrapeJobStatusType;
  createdAt?: Date;
  startedAt?: Date;
  finishedAt?: Date;
}
