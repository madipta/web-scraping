import { IndexManagerService } from '../index-manager';
import { IIndexScrapResult } from '../scrapers/index-scrap.interface';
import { ILooper } from './looper.interface';

const ctag = '[PagingLooper]';

export class PagingLooper implements ILooper {
  constructor(public manager: IndexManagerService) {}

  async run() {
    let page = 1;
    let links: IIndexScrapResult[];
    let errorCount = 0;
    let totalErrorCount = 0;
    const errorWaitInMs = 3000;
    const maxPage = 1000;
    const maxErrorCount = 3;
    const maxTotalErrorCount = 100;
    const domainHome = this.manager.setting.domainHome;
    const pageUrl = this.manager.setting.url;
    if (!domainHome) {
      console.log(`${ctag} domainHome not set!`);
      throw `Domain not set!`;
    }
    do {
      links = [];
      const url =
        page === 1 ? domainHome : pageUrl.replace('{{PAGE_NUMBER}}', `${page}`);
      page++;
      try {
        const res = await this.manager.load(url);
        links = await this.manager.scrap(res);
        this.manager.addLinks(links);
        errorCount = 0;
      } catch (error) {
        page--;
        errorCount++;
        totalErrorCount++;
        console.error(ctag, error);
        console.error(
          `${ctag} error count: ${errorCount}x, total:${totalErrorCount}x`
        );
        if (
          totalErrorCount >= maxTotalErrorCount ||
          errorCount > maxErrorCount
        ) {
          throw `${ctag} too many errors!`;
        }
        console.error(`${ctag} wait ${errorWaitInMs}ms`);
        await new Promise((resolve) => {
          setTimeout(resolve, errorWaitInMs);
        });
      }
    } while (links && links.length && page <= maxPage);
    return false;
  }
}
