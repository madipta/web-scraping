import { NzTableQueryParams } from "ng-zorro-antd/table";
import { BehaviorSubject, Observable } from "rxjs";

export class Pager {
  pageIndex = 1;
  pageSize = 20;
  sortField: string;
  sortOrder = "asc";
  search: string;
}

export class NzDataPaginator {
  private pager: Pager;
  private subject: BehaviorSubject<Pager>;
  pager$: Observable<Pager>;

  constructor(options: Partial<Pager>) {
    this.pager = new Pager();
    this.pager = { ...this.pager, ...options };
    this.subject = new BehaviorSubject(this.pager);
    this.pager$ = this.subject.asObservable();
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

  setPager(pager: Pager) {
    this.pager = pager;
    this.subject.next(this.pager);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const defaultSort = {
      key: this.pager.sortField,
      value: this.pager.sortOrder,
    };
    const currentSort = sort.find((item) => item.value !== null) || defaultSort;
    const sortField = currentSort.key || defaultSort.key;
    const sortOrder = currentSort.value || defaultSort.value;
    this.setPager({
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      search: this.pager.search,
    });
  }
}