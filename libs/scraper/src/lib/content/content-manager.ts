import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IContent } from '@web-scraping/orm';
import { ISetting } from '../common/setting.interface';
import { ScrapeEvents } from '../scraper.event';
import { SpaLoader } from '../loaders/spa-loader';
import { WebLoader } from '../loaders/web-loader';
import { HtmlScrap } from './scrapers/html-scrap';

@Injectable()
export class ContentManagerService {
  constructor(private eventEmitter: EventEmitter2) {}

  private async load(setting: ISetting) {
    const loader =
      setting.scrapArticleMethod === 'spa' ? new SpaLoader() : new WebLoader();
    return loader.load(setting.url);
  }

  private async scrap(setting: ISetting, text: string) {
    const scraper = new HtmlScrap();
    return scraper.scrap(text, setting);
  }

  async manage(setting: ISetting, url: string, jobId: string) {
    let responseText: string;
    try {
      responseText = await this.load(setting);
    } catch {
      this.eventEmitter.emit(ScrapeEvents.ErrorLoading, { url, jobId });
      return;
    }
    this.eventEmitter.emit(ScrapeEvents.SuccessLoading, { url });
    let content: IContent;
    try {
      content = await this.scrap(setting, responseText);
    } catch (e) {
      console.error(url, e);
      this.eventEmitter.emit(ScrapeEvents.ErrorScraping, { url, jobId });
      return;
    }
    this.eventEmitter.emit(ScrapeEvents.SuccessScraping, {
      url,
      jobId,
      content,
    });
  }
}
