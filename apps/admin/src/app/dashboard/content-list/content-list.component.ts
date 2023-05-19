import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { ContentPagingService } from "../shared/services/content-paging.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  imports: [
    SharedModule,
    TableSearchComponent
  ],
  selector: "web-scraping-content-list",
  standalone: true,
  styleUrls: ["./content-list.component.scss"],
  templateUrl: "./content-list.component.html",
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
