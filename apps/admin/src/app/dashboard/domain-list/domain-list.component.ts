import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { DomainService } from "../shared/services/domain.service";
import { GqlDomainPageListResult } from "../shared/gql/dto/domain.dto";
import { ScraperService } from "../shared/services/scraper.service";
import { Pager, NzDataPaginator } from "../shared/services/nz-data-paginator";

@Component({
  selector: "web-scraping-domain-list",
  templateUrl: "./domain-list.component.html",
  styleUrls: ["./domain-list.component.scss"],
})
export class DomainListComponent implements OnInit {
  total = 1;
  domainList: GqlDomainPageListResult[] = [];
  loading = true;
  pager: Pager;
  pagination = new NzDataPaginator({ sortField: "home" });

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private domainService: DomainService,
    private scraperService: ScraperService
  ) {}

  async ngOnInit() {
    this.pagination.pager$.subscribe(async (pager) => {
      this.pager = pager;
      this.loading = true;
      const res = await this.domainService.fetchList(
        pager.pageIndex,
        pager.pageSize,
        pager.sortField,
        pager.sortOrder,
        pager.search
      );
      this.loading = false;
      this.total = res.total;
      this.domainList = res.result;
    });
  }

  search(search: string) {
    this.pagination.search(search);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pagination.onQueryParamsChange(params);
  }

  async delete(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.domainService.delete({ id });
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Domain deleted!");
    } else {
      this.msg.error("Deleting domain failed!");
    }
  }

  async scrap(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapIndex(id);
    this.msg.remove(msgId);
    if (result.ok) {
      this.pagination.first();
    }
  }

  gotoLinks(data: GqlDomainPageListResult) {
    this.router.navigate(["dashboard", "link-list"], {
      queryParams: { id: data.id },
    });
  }
}
