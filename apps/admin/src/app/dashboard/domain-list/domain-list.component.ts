import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { DomainListItem, NzTableFilter } from "@web-scraping/dto";
import { DomainService } from "../shared/domain.service";

@Component({
  selector: "web-scraping-domain-list",
  templateUrl: "./domain-list.component.html",
  styleUrls: ["./domain-list.component.scss"],
})
export class DomainListComponent {
  total = 1;
  domainList: DomainListItem[] = [];
  loading = true;
  pageIndex = 1;
  pageSize = 2;
  sortField: string;
  sortOrder: string;
  filter: NzTableFilter;

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
    filter: NzTableFilter
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
      this.total = data.total;
      this.domainList = data.result;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const defaultSort = { key: "home", value: "asc" };
    const currentSort = sort.find((item) => item.value !== null) || defaultSort;
    const sortField = currentSort.key || defaultSort.key;
    const sortOrder = currentSort.value || defaultSort.value;
    this.loadData(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  async delete(id) {
    const msgId = this.msg.loading("progress...").messageId;
    const result = await this.DomainService.delete({ id });
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Deleted!");
      this.refreshData();
    }
  }
}
