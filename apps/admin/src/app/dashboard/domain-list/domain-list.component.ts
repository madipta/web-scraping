import { Component } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { DomainListRow } from "@web-scraping/dto";
import { DomainListService } from "./domain-list.service";
import { Router } from "@angular/router";

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

  constructor(
    public router: Router,
    private DomainListService: DomainListService
  ) {}

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.DomainListService.fetchDomainList(
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
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  edit(id) {
    alert(id);
  }

  delete(id) {
    alert(id);
  }
}
