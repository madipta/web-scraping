import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";
import { NzPagingService } from "../shared/services/nz-paging.service";
import { ScrapeJobService } from "../shared/services/scrape-job.service";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-jobs-list",
  standalone: true,
  templateUrl: "./jobs-list.component.html",
})
export class JobsListComponent implements OnInit, OnDestroy {
  pagingService = new NzPagingService({ sortBy: "created_at" });
  vm = this.pagingService.data;
  destroy$ = new Subject();

  route = inject(ActivatedRoute);
  router = inject(Router);

  private scrapeJobService = inject(ScrapeJobService);

  ngOnInit(): void {
    this.pagingService.pager$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (pager) => {
        const status = pager.filter.status as string;
        if (status) {
          return this.pagingService.load(
            this.scrapeJobService.fetchList(pager, status)
          );
        }
      });
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([, query]) => {
        const status = query.status;
        this.pagingService.setFilter({ status });
      });
  }

  search(search: string) {
    this.pagingService.search(search);
  }

  refresh() {
    this.pagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pagingService.onQueryParamsChange(params);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
