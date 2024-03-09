import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ISetting } from '../common/setting.interface';
import { SpaLoader } from '../loaders/spa-loader';
import { WebLoader } from '../loaders/web-loader';
import { ScrapeEvents } from '../scraper.event';
import { ILooper } from './loopers/looper.interface';
import { IndexHtmlScrap } from './scrapers/index-html-scrap';
import { IIndexScrapResult } from './scrapers/index-scrap.interface';
import { SingleLooper } from './loopers/single';
import { PagingLooper } from './loopers/paging';

@Injectable()
export class IndexManagerService {
  private looper: ILooper;
  setting: ISetting;
  jobId: string;

  constructor(private eventEmitter: EventEmitter2) {}

  async load(url: string) {
    try {
      const loader =
        this.setting.scrapArticleMethod === 'spa'
          ? new SpaLoader()
          : new WebLoader();
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
      const scraper = new IndexHtmlScrap();
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
    this.looper =
      this.setting.scrapIndexPaging === 'single'
        ? new SingleLooper(this)
        : new PagingLooper(this);
    await this.looper.run();
  }
}
