import { IContent } from "@web-scraping/orm";

export interface IScrapResult {
  ok: boolean;
  content?: IContent;
  error?: string;
}