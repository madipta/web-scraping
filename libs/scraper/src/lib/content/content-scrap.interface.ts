import { IContent } from "@web-scraping/orm";
import { ISetting } from "../common/setting.interface";

export interface IContentScrap {
  scrap(text: string, setting: ISetting): Promise<IContent>;
}
