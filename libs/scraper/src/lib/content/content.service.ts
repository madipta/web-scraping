import { ISetting } from "../common/setting.interface";
import { IContentLoader } from "../loaders/content-loader.interface";
import { WebLoader } from "../loaders/web-loader";
import { IContentScrap } from "./scrapers/content-scrap.interface";
import { HtmlScrap } from "./scrapers/html-scrap";

const contentLoaders = {
  "web-full": new WebLoader(),
};

const contentScrapers = {
  "html": HtmlScrap,
};

export class ContentService {
  url: string;
  loader: IContentLoader;
  scraper: IContentScrap;

  constructor(private setting: ISetting) {
    this.url = setting.url;
    this.loader = contentLoaders[setting.scrapIndexMethod];
    this.scraper = new contentScrapers["html"]();
  }

  async load(url: string) {
    return this.loader.load(url);
  }

  async scrap(text: string) {
    return this.scraper.scrap(text, this.setting);
  }
}
