import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { DomainService } from "../shared/services/domain.service";
import { GqlDomainPageListResult } from "../shared/gql/dto/domain.dto";
import { ScraperService } from "../shared/services/scraper.service";

@Component({
  selector: "web-scraping-domain-list",
  templateUrl: "./domain-list.component.html",
  styleUrls: ["./domain-list.component.scss"],
})
export class DomainListComponent {
  total = 1;
  domainList: GqlDomainPageListResult[] = [];
  loading = true;
  pageIndex = 1;
  pageSize = 20;
  sortField = "home";
  sortOrder = "asc";
  search = "";

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private domainService: DomainService,
    private scraperService: ScraperService
  ) {}

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
    const res = await this.domainService.fetchList(
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      search
    );
    this.loading = false;
    this.total = res.total;
    this.domainList = res.result;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const defaultSort = { key: this.sortField, value: this.sortOrder };
    const currentSort = sort.find((item) => item.value !== null) || defaultSort;
    const sortField = currentSort.key || defaultSort.key;
    const sortOrder = currentSort.value || defaultSort.value;
    this.loadData(pageIndex, pageSize, sortField, sortOrder, this.search);
  }

  async delete(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.domainService.delete({ id });
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Deleted!");
      this.refreshData();
    }
  }

  async scrap(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapIndex(id);
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Index scraping success!");
    } else {
      this.msg.error("Index scraping failed!");
    }
    this.refreshData();
  }

  gotoLinks(data: GqlDomainPageListResult) {
    if (!+data.linksCount) {
      this.msg.error("Links not scraped yet!");
      return;
    }
    this.router.navigate(["dashboard", "link-list"], {
      queryParams: { id: data.id },
    });
  }
}
