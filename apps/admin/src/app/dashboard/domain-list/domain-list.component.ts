import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { GqlDomainPageListResult } from "../shared/gql/dto/domain.dto";
import { DomainService } from "../shared/services/domain.service";
import { NzTablePaging } from "../shared/services/nz-table-paging";
import { ScraperService } from "../shared/services/scraper.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-domain-list",
  standalone: true,
  templateUrl: "./domain-list.component.html",
})
export class DomainListComponent {
  router = inject(Router);

  private destroyRef = inject(DestroyRef);
  private domainService = inject(DomainService);
  private msg = inject(NzMessageService);
  private scraperService = inject(ScraperService);

  tableData = new NzTablePaging({ sortBy: "home" });
  vm = this.tableData.data;

  constructor() {
    this.tableData.pager$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (pager) => {
        this.tableData.load(this.domainService.fetchList(pager));
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

  async delete(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.domainService.delete({ id });
    this.msg.remove(msgId);
    if (!result.ok) {
      this.msg.error(result.error || "Deleting domain failed!");
    } else {
      this.msg.success("Domain deleted!");
      this.tableData.refresh();
    }
  }

  async scrap(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapIndex(id);
    this.msg.remove(msgId);
    if (!result.ok) {
      this.msg.error(result.error || "Scraping domain failed!");
    } else {
      this.msg.success("Domain scraping job added!");
    }
  }

  gotoLinks(data: GqlDomainPageListResult) {
    this.router.navigate(["dashboard", "link-list"], {
      queryParams: { id: data.id },
    });
  }
}
