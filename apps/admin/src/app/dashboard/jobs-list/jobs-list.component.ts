import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ScrapeJobPagingService } from "../shared/services/scrape-job-paging.service";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";

@Component({
  imports: [
    SharedModule,
    TableSearchComponent
  ],
  selector: "web-scraping-jobs-list",
  standalone: true,
  styleUrls: ["./jobs-list.component.scss"],
  templateUrl: "./jobs-list.component.html",
})
export class JobsListComponent implements OnInit, OnDestroy {
  vm$ = this.scrapeJobPagingService.data$;
  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private msg: NzMessageService,
    private scrapeJobPagingService: ScrapeJobPagingService
  ) {}

  ngOnInit(): void {
    this.scrapeJobPagingService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => this.msg.error(error));
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([, query]) => {
        const status = query.status;
        this.scrapeJobPagingService.setFilter({ status });
      });
  }

  search(search: string) {
    this.scrapeJobPagingService.search(search);
  }

  refresh() {
    this.scrapeJobPagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.scrapeJobPagingService.onQueryParamsChange(params);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
