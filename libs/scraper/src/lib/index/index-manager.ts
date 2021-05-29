import { Subject } from "rxjs";
import { IndexLoaders, IndexPaging, IndexScrapers } from "../common/constants";
import { ISetting } from "../common/setting.interface";
import { ILooper } from "./loopers/looper.interface";
import { IIndexScrapResult } from "./scrapers/index-scrap.interface";

export class IndexManager {
  linkAddSubject = new Subject<IIndexScrapResult[]>();
  private looper: ILooper;

  constructor(public setting: ISetting) {}

  async load(url: string) {
    const loader = new IndexLoaders[this.setting.scrapIndexMethod]();
    return loader.load(url);
  }

  async scrap(text: string) {
    const scraper = new IndexScrapers[this.setting.scrapIndexFormat]();
    return scraper.scrap(text, this.setting);
  }

  async manage() {
    this.looper = new IndexPaging[this.setting.scrapIndexPaging](this);
    await this.looper.run();
  }

  linksAdd$ = this.linkAddSubject.asObservable();
}
