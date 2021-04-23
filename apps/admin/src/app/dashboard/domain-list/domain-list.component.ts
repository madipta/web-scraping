import { Component } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { DomainListRow } from "@web-scraping/dto";
import { Router } from "@angular/router";
import { DomainService } from "../domain.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "web-scraping-domain-list",
  templateUrl: "./domain-list.component.html",
  styleUrls: ["./domain-list.component.scss"],
})
export class DomainListComponent {
  total = 1;
  domainList: DomainListRow[] = [];
  loading = true;
  pageIndex = 1;
  pageSize = 20;
  sortField: string;
  sortOrder: string;
  filter: { key: string; value: string[] }[];

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private DomainService: DomainService
  ) {}

  refreshData() {
    this.loadData(
      this.pageIndex,
      this.pageSize,
      this.sortField,
      this.sortOrder,
      this.filter
    );
  }

  loadData(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortField = sortField;
    this.sortOrder = sortOrder;
    this.filter = filter;
    this.DomainService.fetchDomainList(
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      filter
    ).subscribe((data) => {
      this.loading = false;
      this.total = data.rowCount;
      this.domainList = data.result;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || "home";
    const sortOrder = (currentSort && currentSort.value) || "asc";
    this.loadData(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  async delete(id) {
    const msgId = this.msg.loading('progress...').messageId;
    const result = await this.DomainService.delete({ id });
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success('Deleted!');
      this.refreshData();
    }
  }
}
