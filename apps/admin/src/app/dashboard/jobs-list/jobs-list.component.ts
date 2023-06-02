import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest } from "rxjs";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";
import { NzTablePaging } from "../shared/services/nz-table-paging";
import { ScrapeJobService } from "../shared/services/scrape-job.service";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-jobs-list",
  standalone: true,
  templateUrl: "./jobs-list.component.html",
})
export class JobsListComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);

  private destroyRef = inject(DestroyRef);
  private scrapeJobService = inject(ScrapeJobService);

  tableData = new NzTablePaging({ sortBy: "created_at" });
  vm = this.tableData.data;

  constructor() {
    this.tableData.pager$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (pager) => {
        const status = pager.filter.status as string;
        if (status) {
          return this.tableData.load(
            this.scrapeJobService.fetchList(pager, status)
          );
        }
      });
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([, query]) => {
        const status = query.status;
        this.tableData.setFilter({ status });
      });
  }

  search(search: string) {
    this.tableData.search(search);
  }

  refresh() {
    this.tableData.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.tableData.onQueryParamsChange(params);
  }
}
