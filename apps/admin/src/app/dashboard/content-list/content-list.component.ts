import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";
import { NzPagingService } from "../shared/services/nz-paging.service";
import { ContentService } from "../shared/services/content.service";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-content-list",
  standalone: true,
  styleUrls: ["./content-list.component.scss"],
  templateUrl: "./content-list.component.html",
})
export class ContentListComponent implements OnInit, OnDestroy {
  pagingService = new NzPagingService({ sortBy: "Link.title" });
  vm$ = this.pagingService.data$;
  destroy$ = new Subject();

  constructor(
    public router: Router,
    private contentService: ContentService,
    private msg: NzMessageService
  ) {}

  async ngOnInit() {
    this.pagingService.pager$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (pager) => {
        this.pagingService.load(this.contentService.fetchList(pager));
      });
    this.pagingService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => this.msg.error(error));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  search(search: string) {
    this.pagingService.search(search);
  }

  refresh() {
    this.pagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pagingService.onQueryParamsChange(params);
  }
}
