import { ContentLoaders, ContentScrapers } from "../common/constants";
import { ISetting } from "../common/setting.interface";

export class ContentManager {
  constructor(private setting: ISetting) {}

  async load(url: string) {
    const loader = ContentLoaders[this.setting.scrapArticleMethod];
    return loader.load(url);
  }

  async scrap(text: string) {
    const scraper = new ContentScrapers[this.setting.scrapArticleFormat]();
    return scraper.scrap(text, this.setting);
  }
}
