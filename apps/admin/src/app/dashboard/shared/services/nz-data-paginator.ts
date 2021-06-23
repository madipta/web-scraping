import { NzTableQueryParams } from "ng-zorro-antd/table";
import { BehaviorSubject } from "rxjs";

export class Pager {
  pageIndex = 1;
  pageSize = 20;
  sortBy: string;
  sortOrder = "asc";
  search = "";
  filter: Record<string, string | number> = {};
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

  getFilter() {
    return { ...this.pager.filter };
  }

  addFilter(key: string, value: string | number) {
    this.pager.filter[key] = value;
  }

  removeFilter(key: string) {
    delete this.pager.filter[key];
  }

  setFilter(filter: Record<string, string | number>) {
    for (const key in filter) {
      if (this.pager.filter[key] === filter[key]) {
        continue;
      }
      this.pager.filter = { ...this.pager.filter, ...filter };
      this.pager.pageIndex = 1;
      this.subject.next(this.pager);
      break;
    }
  }

  getPager() {
    return { ...this.pager };
  }

  setPager(pager: Partial<Pager>) {
    for (const key in pager) {
      if (this.pager[key] === pager[key]) {
        continue;
      }
      this.pager = { ...this.pager, ...pager };
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
