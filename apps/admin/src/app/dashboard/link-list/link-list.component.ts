import { Location } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest } from "rxjs";
import { GqlGetDomainResult } from "../shared/gql/dto/domain.dto";
import { GqlLinkPageListResult } from "../shared/gql/dto/link.dto";
import { DomainService } from "../shared/services/domain.service";
import { LinkService } from "../shared/services/link.service";
import { ScraperService } from "../shared/services/scraper.service";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";
import { NzTablePaging } from "../shared/services/nz-table-paging";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-link-list",
  standalone: true,
  templateUrl: "./link-list.component.html",
})
export class LinkListComponent {
  domain: GqlGetDomainResult;

  route = inject(ActivatedRoute);
  router = inject(Router);

  private destroyRef = inject(DestroyRef);
  private domainService = inject(DomainService);
  private linkService = inject(LinkService);
  private location = inject(Location);
  private msg = inject(NzMessageService);
  private scraperService = inject(ScraperService);

  tableData = new NzTablePaging({ sortBy: "title" });
  vm = this.tableData.data;

  constructor() {
    this.tableData.pager$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (pager) => {
        const domainId = +pager.filter["domainId"];
        if (!isNaN(domainId)) {
          return this.tableData.load(
            this.linkService.fetchList(pager, domainId)
          );
        }
      });
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async ([, query]) => {
        const domainId = +query["id"];
        this.domain = await this.getDomain(domainId);
        this.tableData.setFilter({ domainId });
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

  async getDomain(id: number) {
    const result = await this.domainService.get({ id });
    if (result.ok) {
      return result.result;
    }
    this.msg.error(result.error || "Error getting domain!");
    this.location.back();
    return null;
  }

  async delete(id) {
    const result = await this.linkService.delete(id);
    if (!result.ok) {
      this.msg.error(result.error || "Delete failed!");
    } else {
      this.msg.success("Deleted!");
      this.tableData.refresh();
    }
  }

  async scrapAll() {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapeContentByDomain(
      this.domain.id
    );
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Scraping content job created!");
    } else {
      this.msg.error(result.error || "Create content scraping job failed!");
    }
  }

  async scrapOne(linkId: number) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapContent(linkId);
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Scraping content job created!");
    } else {
      this.msg.error(result.error || "Create content scraping job failed!");
    }
  }

  gotoContent(data: GqlLinkPageListResult) {
    this.router.navigate(["dashboard", "content"], {
      queryParams: { id: data.id },
    });
  }
}
