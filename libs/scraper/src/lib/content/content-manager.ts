import { IContent } from "@web-scraping/orm";
import { Subject } from "rxjs";
import { ContentLoaders, ContentScrapers } from "../common/constants";
import { ISetting } from "../common/setting.interface";

export class ContentManager {
  errorLoadingSubject = new Subject();
  successLoadingSubject = new Subject();
  errorScrapingSubject = new Subject();
  contentAddSubject = new Subject<IContent>();
  contentAdd$ = this.contentAddSubject.asObservable();
  errorLoading$ = this.errorLoadingSubject.asObservable();
  successLoading$ = this.successLoadingSubject.asObservable();
  errorScraping$ = this.errorScrapingSubject.asObservable();

  constructor(private setting: ISetting) {}

  async load(url: string) {
    const loader = ContentLoaders[this.setting.scrapArticleMethod];
    return loader.load(url);
  }

  async scrap(text: string) {
    const scraper = new ContentScrapers[this.setting.scrapArticleFormat]();
    return scraper.scrap(text, this.setting);
  }

  async manage() {
    const responseText = await this.load(this.setting.url);
    if (!responseText) {
      this.errorLoadingSubject.next();
      return;
    }
    this.successLoadingSubject.next();
    const content = await this.scrap(responseText);
    if (!content) {
      this.errorScrapingSubject.next();
      return;
    }
    this.contentAddSubject.next(content);
  }
}
