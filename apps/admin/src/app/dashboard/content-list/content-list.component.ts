import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";
import { NzTablePaging } from "../shared/services/nz-table-paging";
import { ContentService } from "../shared/services/content.service";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-content-list",
  standalone: true,
  templateUrl: "./content-list.component.html",
})
export class ContentListComponent {
  router = inject(Router);

  private destroyRef = inject(DestroyRef);

  tableData = new NzTablePaging({ sortBy: "Link.title" });
  vm = this.tableData.data;

  private contentService = inject(ContentService);

  constructor() {
    this.tableData.pager$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (pager) => {
        this.tableData.load(this.contentService.fetchList(pager));
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
