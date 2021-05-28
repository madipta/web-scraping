import { Subject } from 'rxjs';
import { IndexLoaders, IndexScrapers } from '../common/constants';
import { ISetting } from '../common/setting.interface';
import { IIndexScrapResult } from './scrapers/index-scrap.interface';

export class IndexManager {
  private linkAddSubject = new Subject<IIndexScrapResult[]>();

  constructor(private setting: ISetting) {}

  async load(url: string) {
    const loader = IndexLoaders[this.setting.scrapIndexMethod];
    return loader.load(url);
  }

  async scrap(text: string) {
    const scraper = new IndexScrapers[this.setting.scrapIndexFormat]();
    return scraper.scrap(text, this.setting);
  }

  async run() {
    const res = await this.load(this.setting.url);
    const links: IIndexScrapResult[] = await this.scrap(res);
    this.linkAddSubject.next(links);
  }

  linksAdd$ = this.linkAddSubject.asObservable();
}