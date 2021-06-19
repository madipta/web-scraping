import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { GqlScrapeJobPageListResult } from "../shared/gql/dto/scrap-job.dto";
import { NzDataPaginator } from "../shared/services/nz-data-paginator";
import { ScrapeJobService } from "../shared/services/scrape-job.service";

@Component({
  selector: "web-scraping-jobs-list",
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"],
})
export class JobsListComponent implements OnInit, OnDestroy {
  total = 1;
  scrapeJobList: GqlScrapeJobPageListResult[] = [];
  loading = true;
  jobStatus: string;
  paginator = new NzDataPaginator({ sortField: "created_at" });
  pager = this.paginator.getPager();
  notifier = new Subject();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private scrapJobService: ScrapeJobService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(take(1))
      .subscribe(([, query]) => {
        this.jobStatus = query.status;
        this.paginator.pager$
          .pipe(takeUntil(this.notifier))
          .subscribe(async (pager) => {
            this.pager = pager;
            this.loading = true;
            const res = await this.scrapJobService.fetchList(
              this.pager,
              this.jobStatus
            );
            this.loading = false;
            this.total = res.total;
            this.scrapeJobList = res.result;
          });
      });
  }

  search(search: string) {
    this.paginator.search(search);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginator.onQueryParamsChange(params);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
