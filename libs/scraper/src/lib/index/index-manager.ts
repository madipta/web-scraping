import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IndexLoaders, IndexPaging, IndexScrapers } from "../common/constants";
import { ISetting } from "../common/setting.interface";
import { ScrapeEvents } from "../scraper.event";
import { ILooper } from "./loopers/looper.interface";
import { IIndexScrapResult } from "./scrapers/index-scrap.interface";

@Injectable()
export class IndexManagerService {
  private looper: ILooper;
  setting: ISetting;
  
  constructor(private eventEmitter: EventEmitter2) {}

  async load(url: string) {
    const loader = new IndexLoaders[this.setting.scrapIndexMethod]();
    return loader.load(url);
  }

  async scrap(text: string) {
    const scraper = new IndexScrapers[this.setting.scrapIndexFormat]();
    return scraper.scrap(text, this.setting);
  }

  addLinks(links: IIndexScrapResult[]) {
    this.eventEmitter.emit(ScrapeEvents.SuccessIndexScraping, links);
  }

  async manage(setting: ISetting) {
    this.setting = setting;
    this.looper = new IndexPaging[this.setting.scrapIndexPaging](this);
    await this.looper.run();
  }
}
