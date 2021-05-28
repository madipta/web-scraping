import { ISetting } from "../../common/setting.interface";

export interface IIndexScrapResult {
  domainId: number;
  url: string;
  title?: string;
}

export interface IIndexScrap {
  scrap(text: string, setting: ISetting): Promise<IIndexScrapResult[]>;
}
