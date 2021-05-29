import { IndexManager } from "../index-manager";
import { ILooper } from "./looper.interface";

export class PagingLooper implements ILooper {
  manager: IndexManager = null;

  constructor(manager) {
    this.manager = manager;
  }

  async run() {
    let page = 1;
    let links = [];
    let errorCount = 0;
    let totalErrorCount = 0;
    const maxPage = 100;
    const maxErrorCount = 3;
    const maxTotalErrorCount = 100;
    do {
      links = [];
      const url = this.manager.setting.url.replace(
        "{{PAGE_NUMBER}}",
        `${page++}`
      );
      try {
        const res = await this.manager.load(url);
        links = await this.manager.scrap(res);
        this.manager.linkAddSubject.next(links);
        errorCount = 0;
      } catch (e) {
        page--;
        errorCount++;
        totalErrorCount++;
        if (totalErrorCount >= maxTotalErrorCount) {
          throw "[PagingLooper] too many errors!"
        }
        if (errorCount <= maxErrorCount) {
          continue;
        }
        console.error(e);
      }
    } while (links && links.length && page <= maxPage);
    return false;
  }
}
