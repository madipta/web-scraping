import { Injectable } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { LinkService } from "./link.service";
import { NzPagingService } from "./nz-paging.service";

@Injectable({ providedIn: "root" })
export class LinkPagingService {
  pagingService = new NzPagingService({ sortBy: "title" });
  data$ = this.pagingService.data$;
  error$ = this.pagingService.error$;

  constructor(private linkService: LinkService) {
    this.pagingService.pager$.subscribe(async (pager) => {
      const domainId = +pager.filter.domainId;
      if (!isNaN(domainId)) {
        return this.pagingService.load(
          this.linkService.fetchList(pager, domainId)
        );
      }
    });
  }

  setFilter(filter: Record<string, string | number>) {
    this.pagingService.setFilter(filter);
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
