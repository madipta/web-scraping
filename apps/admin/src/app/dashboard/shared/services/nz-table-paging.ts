import { inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { BehaviorSubject, combineLatest } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { BasePagingResult } from "../gql/dto/base-result.dto";
import { NzTablePaginator, Pager } from "./nz-table-paginator";

export class NzTablePaging<T = unknown> {
  private subject = new BehaviorSubject<BasePagingResult<T>>({
    error: null,
    ok: true,
    result: [],
    total: 0,
  });
  private state$ = this.subject.asObservable();
  private paginator = new NzTablePaginator({});
  loading = signal(false);
  pager$ = this.paginator.pager$;
  private result$ = this.state$.pipe(
    map((state) => state.result),
    distinctUntilChanged()
  );
  private total$ = this.state$.pipe(
    map((state) => state.total),
    distinctUntilChanged()
  );
  private error$ = this.state$.pipe(
    filter((state) => !!state.error),
    map((state) => state.error),
    distinctUntilChanged()
  );
  data = toSignal(
    combineLatest([this.pager$, this.result$, this.total$]).pipe(
      map(([pager, result, total]) => {
        return { pager, result, total };
      })
    )
  );
  private msg = inject(NzMessageService);

  constructor(pagingOptions: Partial<Pager>) {
    this.paginator.setPager(pagingOptions);
    this.error$.subscribe((error) => {
      this.msg.error(error);
    });
  }

  async load(val: Promise<BasePagingResult<T>>) {
    this.loading.set(true)
    this.subject.next(await val);
    this.loading.set(false)
  }

  search(search: string) {
    this.paginator.search(search);
  }

  refresh() {
    this.paginator.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.paginator.onQueryParamsChange(params);
  }

  getFilter() {
    return this.paginator.getFilter();
  }

  addFilter(key: string, value: string | number) {
    this.paginator.addFilter(key, value);
  }

  removeFilter(key: string) {
    this.paginator.removeFilter(key);
  }

  setFilter(filter: Record<string, string | number>) {
    this.paginator.setFilter(filter);
  }
}
