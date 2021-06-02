export type GqlScrapeJobPageList = {
  ok: boolean;
  error?: string;
  total?: number;
  result?: GqlScrapeJobPageListResult[];
};

export type GqlScrapeJobPageListResult = {
  id?: string;
  url?: string;
  title?: string;
  createdAt?: Date;
  startedAt?: Date;
  finishedAt?: Date;
};