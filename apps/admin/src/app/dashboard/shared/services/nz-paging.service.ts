import { Injectable } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { BehaviorSubject, combineLatest } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { BasePagingResult } from "../gql/dto/base-result.dto";
import { NzDataPaginator, Pager } from "./nz-data-paginator";

@Injectable({ providedIn: "root" })
export class NzPagingService<T = unknown> {
  private subject = new BehaviorSubject<BasePagingResult<T>>({
    error: null,
    ok: true,
    result: [],
    total: 0,
  });
  private state$ = this.subject.asObservable();
  private paginator = new NzDataPaginator({});
  private loadingSubject = new BehaviorSubject(false);
  private loading$ = this.loadingSubject.asObservable();
  pager$ = this.paginator.pager$;
  private result$ = this.state$.pipe(
    map((state) => state.result),
    distinctUntilChanged()
  );
  private total$ = this.state$.pipe(
    map((state) => state.total),
    distinctUntilChanged()
  );
  error$ = this.state$.pipe(
    filter((state) => !!state.error),
    map((state) => state.error),
    distinctUntilChanged()
  );
  data$ = combineLatest([
    this.loading$,
    this.pager$,
    this.result$,
    this.total$,
  ]).pipe(
    map(([loading, pager, result, total]) => {
      return { loading, pager, result, total };
    })
  );

  constructor(pagingOptions: Partial<Pager>) {
    this.paginator.setPager(pagingOptions);
  }

  async load(val: Promise<BasePagingResult<T>>) {
    this.loadingSubject.next(true);
    this.subject.next(await val);
    this.loadingSubject.next(false);
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
