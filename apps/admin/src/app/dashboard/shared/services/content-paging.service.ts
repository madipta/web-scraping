import { Injectable } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { ContentService } from "./content.service";
import { NzPagingService } from "./nz-paging.service";

@Injectable({ providedIn: "root" })
export class ContentPagingService {
  pagingService = new NzPagingService({ sortBy: "Link.title" });
  data$ = this.pagingService.data$;
  error$ = this.pagingService.error$;

  constructor(private readonly contentService: ContentService) {
    this.pagingService.pager$.subscribe(async (pager) => {
      this.pagingService.load(this.contentService.fetchList(pager));
    });
  }

  search(search: string) {
    this.pagingService.search(search);
  }

  refresh() {
    this.pagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.pagingService.onQueryParamsChange(params);
  }
}
