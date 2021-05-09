import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { ContentWithRef } from "@web-scraping/dto";
import { ContentService } from "../shared/services/content.service";

@Component({
  selector: "web-scraping-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent {
  total = 1;
  contentList: ContentWithRef[] = [];
  loading = true;
  pageIndex = 1;
  pageSize = 20;
  sortField = "content";
  sortOrder = "asc";
  search = "";

  constructor(
    public router: Router,
    private contentService: ContentService
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
    this.contentService.fetchList(
      pageIndex,
      pageSize,
      sortField,
      sortOrder,
      search
    ).subscribe((data) => {
      this.loading = false;
      this.total = data.total;
      this.contentList = data.result;
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
}
