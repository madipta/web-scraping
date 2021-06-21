import { NzTableQueryParams } from "ng-zorro-antd/table";
import { BehaviorSubject } from "rxjs";

export class Pager {
  pageIndex = 1;
  pageSize = 20;
  sortBy: string;
  sortOrder = "asc";
  search: string;
}

export class NzDataPaginator {
  private pager = new Pager();
  private subject = new BehaviorSubject(this.pager);
  pager$ = this.subject.asObservable();

  constructor(options: Partial<Pager>) {
    this.pager = { ...this.pager, ...options };
  }

  first() {
    this.pager.pageIndex = 1;
    this.subject.next(this.pager);
  }

  refresh() {
    this.subject.next(this.pager);
  }

  search(search: string) {
    this.pager.search = search;
    this.first();
  }

  getPager() {
    return { ...this.pager };
  }

  setPager(pager: Pager) {
    for (const key in pager) {
      if(this.pager[key] === pager[key]) {
        continue;
      }
      this.pager = pager;
      this.subject.next(this.pager);
      break;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const defaultSort = {
      key: this.pager.sortBy,
      value: this.pager.sortOrder,
    };
    const currentSort = sort.find((item) => item.value !== null) || defaultSort;
    const sortBy = currentSort.key || defaultSort.key;
    const sortOrder = currentSort.value || defaultSort.value;
    this.setPager({
      pageIndex,
      pageSize,
      sortBy,
      sortOrder,
      search: this.pager.search,
    });
  }
}
