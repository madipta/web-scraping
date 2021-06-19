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
  jobId: string;

  constructor(private eventEmitter: EventEmitter2) {}

  async load(url: string) {
    try {
      const loader = new IndexLoaders[this.setting.scrapIndexMethod]();
      const responseText = await loader.load(url);
      this.eventEmitter.emit(ScrapeEvents.SuccessLoading, { url });
      return responseText;
    } catch (e) {
      this.eventEmitter.emit(ScrapeEvents.ErrorLoading, {
        url,
        jobId: this.jobId,
      });
      throw e;
    }
  }

  async scrap(content: string) {
    const url = this.setting.url;
    const jobId = this.jobId;
    try {
      const scraper = new IndexScrapers[this.setting.scrapIndexFormat]();
      const links = await scraper.scrap(content, this.setting);
      this.eventEmitter.emit(ScrapeEvents.SuccessScraping, {
        url,
        jobId,
        content,
      });
      return links;
    } catch (e) {
      this.eventEmitter.emit(ScrapeEvents.ErrorScraping, { url, jobId });
      throw e;
    }
  }

  addLinks(links: IIndexScrapResult[]) {
    this.eventEmitter.emit(ScrapeEvents.SuccessIndexScraping, links);
  }

  async manage(setting: ISetting, jobId: string) {
    this.setting = setting;
    this.jobId = jobId;
    this.looper = new IndexPaging[this.setting.scrapIndexPaging](this);
    await this.looper.run();
  }
}
