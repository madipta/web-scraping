import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { GqlScrapeJobPageListResult } from "../shared/gql/dto/scrap-job.dto";
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
  pageIndex = 1;
  pageSize = 20;
  sortField = "title";
  sortOrder = "asc";
  search = "";
  jobStatus: string;
  routeSubcription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private scrapJobService: ScrapeJobService
  ) {}

  ngOnInit(): void {
    this.routeSubcription = combineLatest([
      this.route.params,
      this.route.queryParams,
    ])
      .pipe(
        map(([, query]) => {
          return query.status;
        })
      )
      .subscribe((status) => {
        this.jobStatus = status;
        this.refreshData();
      });
  }

  ngOnDestroy(): void {
    this.routeSubcription.unsubscribe();
  }

  refreshData() {
    this.loadData(
      1,
      this.pageSize,
      this.sortField,
      this.sortOrder,
      this.search
    );
  }

  async loadData(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ) {
    this.loading = true;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.search = search;
    const res = await this.scrapJobService.fetchList(
      this.jobStatus,
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      search
    );
    this.loading = false;
    this.total = res.total;
    this.scrapeJobList = res.result;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if (!this.jobStatus) {
      return;
    }
    const { pageSize, pageIndex, sort } = params;
    const defaultSort = { key: this.sortField, value: this.sortOrder };
    const currentSort = sort.find((item) => item.value !== null) || defaultSort;
    const sortField = currentSort.key || defaultSort.key;
    const sortOrder = currentSort.value || defaultSort.value;
    this.loadData(pageIndex, pageSize, sortField, sortOrder, this.search);
  }
}
