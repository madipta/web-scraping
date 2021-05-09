import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { filter } from "rxjs/operators";
import { Domain, LinkWithRef } from "@web-scraping/dto";
import { DomainService } from "../shared/services/domain.service";
import { LinkService } from "../shared/services/link.service";

@Component({
  selector: "web-scraping-link-list",
  templateUrl: "./link-list.component.html",
  styleUrls: ["./link-list.component.scss"],
})
export class LinkListComponent implements OnInit {
  domain: Domain;
  total = 1;
  linkList: LinkWithRef[] = [];
  loading = true;
  pageIndex = 1;
  pageSize = 20;
  sortField = "title";
  sortOrder = "asc";
  search = "";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private msg: NzMessageService,
    private domainService: DomainService,
    private linkService: LinkService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter((params) => params.id))
      .subscribe(async (params) => {
        if (!params?.id) {
          this.location.back();
          return;
        }
        this.domain = await this.getDomain(+params.id);
        if (this.domain) {
          // this.refreshData();
        }
      });
  }

  async getDomain(id: number) {
    const res = await this.domainService.get({ id });
    if (res.ok) {
      return res.result;
    }
    this.msg.error("Error getting domain!");
    this.location.back();
    return null;
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

  loadData(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    search: string | null
  ): void {
    this.loading = true;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.search = search;
    this.linkService
      .fetchList(
        this.domain.id,
        pageIndex,
        pageSize,
        sortField,
        sortOrder,
        search
      )
      .subscribe((data) => {
        this.loading = false;
        this.total = data.total;
        this.linkList = data.result;
      });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    const defaultSort = { key: this.sortField, value: this.sortOrder };
    const currentSort = sort.find((item) => item.value !== null) || defaultSort;
    const sortField = currentSort.key || defaultSort.key;
    const sortOrder = currentSort.value || defaultSort.value;
    this.loadData(pageIndex, pageSize, sortField, sortOrder, this.search);
  }

  async scrapAll() {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    await this.linkService.scrapAllContent(this.domain.id);
    this.msg.remove(msgId);
    this.refreshData();
  }

  async scrapOne(linkId: number) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.linkService.scrapContent(linkId);
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Scraped success!");
    } else {
      this.msg.error("Scraped failed!");
    }
    this.refreshData();
  }

  async delete(id) {
    this.linkService.delete(id);
  }

  gotoContent(data: LinkWithRef) {
    if (!data.scraped) {
      this.msg.error("Not scraped yet!");
      return;
    }
    this.router.navigate(["dashboard", "content"], {
      queryParams: { linkId: data.id },
    });
  }
}
