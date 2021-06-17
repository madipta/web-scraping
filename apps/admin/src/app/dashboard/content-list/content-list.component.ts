import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { GqlContentPageListResult } from "../shared/gql/dto/content.dto";
import { ContentService } from "../shared/services/content.service";
import { NzDataPaginator, Pager } from "../shared/services/nz-data-paginator";

@Component({
  selector: "web-scraping-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent implements OnInit {
  total = 1;
  contentList: GqlContentPageListResult[] = [];
  loading = true;
  pager: Pager;
  pagination = new NzDataPaginator({ sortField: "Link.title" });

  constructor(public router: Router, private contentService: ContentService) {}

  async ngOnInit() {
    this.pagination.pager$.subscribe(async (pager) => {
      this.pager = pager;
      this.loading = true;
      const res = await this.contentService.fetchList(pager);
      this.loading = false;
      this.total = res.total;
      this.contentList = res.result;
    });
  }

  search(search: string) {
    this.pagination.search(search);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pagination.onQueryParamsChange(params);
  }
}
