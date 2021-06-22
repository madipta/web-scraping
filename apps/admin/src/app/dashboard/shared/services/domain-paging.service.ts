import { Injectable } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { DomainService } from "./domain.service";
import { NzPagingService } from "./nz-paging.service";

@Injectable({ providedIn: "root" })
export class DomainPagingService {
  pagingService = new NzPagingService({ sortBy: "home" });
  data$ = this.pagingService.data$;
  error$ = this.pagingService.error$;

  constructor(private readonly domainService: DomainService) {
    this.pagingService.pager$.subscribe(async (pager) => {
      this.pagingService.load(this.domainService.fetchList(pager));
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
