import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ContentPagingService } from "../shared/services/content-paging.service";

@Component({
  selector: "web-scraping-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent implements OnInit, OnDestroy {
  vm$ = this.contentPagingService.data$;
  destroy$ = new Subject();

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private contentPagingService: ContentPagingService
  ) {}

  async ngOnInit() {
    this.contentPagingService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => this.msg.error(error));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  search(search: string) {
    this.contentPagingService.search(search);
  }

  refresh() {
    this.contentPagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.contentPagingService.onQueryParamsChange(params);
  }
}
