import { Injectable } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { NzPagingService } from "./nz-paging.service";
import { ScrapeJobService } from "./scrape-job.service";

@Injectable({ providedIn: "root" })
export class ScrapeJobPagingService {
  pagingService = new NzPagingService({ sortBy: "created_at" });
  data$ = this.pagingService.data$;
  error$ = this.pagingService.error$;

  constructor(private scrapeJobService: ScrapeJobService) {
    this.pagingService.pager$.subscribe(async (pager) => {
      const status = pager.filter.status as string;
      if (status) {
        return this.pagingService.load(
          this.scrapeJobService.fetchList(pager, status)
        );
      }
    });
  }

  setFilter(filter: Record<string, string | number>) {
    this.pagingService.setFilter(filter);
  }

  search(search: string) {
    this.pagingService.search(search);
  }

  refresh() {
    this.pagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.pagingService.onQueryParamsChange(params);
  }
}
