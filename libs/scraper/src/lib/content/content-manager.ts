import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { IContent } from "@web-scraping/orm";
import { ContentLoaders, ContentScrapers } from "../common/constants";
import { ISetting } from "../common/setting.interface";
import { ScrapeEvents } from "../scraper.event";

@Injectable()
export class ContentManagerService {
  constructor(private eventEmitter: EventEmitter2) {}

  private async load(setting: ISetting) {
    const loader = ContentLoaders[setting.scrapArticleMethod];
    return loader.load(setting.url);
  }

  private async scrap(setting: ISetting, text: string) {
    const scraper = new ContentScrapers[setting.scrapArticleFormat]();
    return scraper.scrap(text, setting);
  }

  async manage(setting: ISetting, linkId: number, jobId: string) {
    let responseText: string;
    try {
      responseText = await this.load(setting);
    } catch {
      this.eventEmitter.emit(ScrapeEvents.ErrorLoading, { linkId, jobId });
      return;
    }
    this.eventEmitter.emit(ScrapeEvents.SuccessLoading, { linkId });
    let content: IContent;
    try {
      content = await this.scrap(setting, responseText);
    } catch {
      this.eventEmitter.emit(ScrapeEvents.ErrorScraping, { linkId, jobId });
      return;
    }
    this.eventEmitter.emit(ScrapeEvents.SuccessScraping, {
      linkId,
      jobId,
      content,
    });
  }
}
