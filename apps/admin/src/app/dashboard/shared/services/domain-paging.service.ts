import { Injectable } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { BehaviorSubject, combineLatest } from "rxjs";
import { distinctUntilChanged, filter, map } from "rxjs/operators";
import { BasePagingResult } from "../gql/dto/base-result.dto";
import { GqlDomainPageListResult } from "../gql/dto/domain.dto";
import { DomainService } from "./domain.service";
import { NzDataPaginator } from "./nz-data-paginator";

@Injectable({ providedIn: "root" })
export class DomainPagingService {
  private state: BasePagingResult<GqlDomainPageListResult> = {
    error: null,
    ok: true,
    result: [],
    total: 0,
  };
  private subject = new BehaviorSubject(this.state);
  private state$ = this.subject.asObservable();
  private paginator = new NzDataPaginator({ sortBy: "home" });
  private loadingSubject = new BehaviorSubject(false);
  loading$ = this.loadingSubject.asObservable();
  pager$ = this.paginator.pager$;
  result$ = this.state$.pipe(
    map((state) => state.result),
    distinctUntilChanged()
  );
  total$ = this.state$.pipe(
    map((state) => state.total),
    distinctUntilChanged()
  );
  error$ = this.state$.pipe(
    filter((state) => !!state.error),
    map((state) => state.error),
    distinctUntilChanged()
  );
  vm$ = combineLatest([
    this.loading$,
    this.pager$,
    this.result$,
    this.total$,
  ]).pipe(
    map(([loading, pager, result, total]) => {
      return { loading, pager, result, total };
    })
  );

  constructor(private readonly domainService: DomainService) {
    this.paginator.pager$
      .subscribe(async (pager) => {
        this.loadingSubject.next(true);
        const res = await this.domainService.fetchList(pager);
        this.subject.next(res);
        this.loadingSubject.next(false);
      });
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
}
