import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ScrapeJobPagingService } from "../shared/services/scrape-job-paging.service";

@Component({
  selector: "web-scraping-jobs-list",
  templateUrl: "./jobs-list.component.html",
  styleUrls: ["./jobs-list.component.scss"],
})
export class JobsListComponent implements OnInit, OnDestroy {
  vm$ = this.scrapeJobPagingService.data$;
  notifier = new Subject();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private msg: NzMessageService,
    private scrapeJobPagingService: ScrapeJobPagingService
  ) {}

  ngOnInit(): void {
    this.scrapeJobPagingService.error$
      .pipe(takeUntil(this.notifier))
      .subscribe((error) => this.msg.error(error));
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(takeUntil(this.notifier))
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
    this.notifier.next();
    this.notifier.complete();
  }
}
