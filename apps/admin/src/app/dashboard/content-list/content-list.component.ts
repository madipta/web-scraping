import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GqlContentPageListResult } from "../shared/gql/dto/content.dto";
import { ContentService } from "../shared/services/content.service";
import { NzDataPaginator } from "../shared/services/nz-data-paginator";

@Component({
  selector: "web-scraping-content-list",
  templateUrl: "./content-list.component.html",
  styleUrls: ["./content-list.component.scss"],
})
export class ContentListComponent implements OnInit, OnDestroy {
  total = 1;
  contentList: GqlContentPageListResult[] = [];
  loading = true;
  paginator = new NzDataPaginator({ sortBy: "Link.title" });
  pager = this.paginator.getPager();
  notifier = new Subject();

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private contentService: ContentService
  ) {}

  async ngOnInit() {
    this.paginator.pager$
      .pipe(takeUntil(this.notifier))
      .subscribe(async (pager) => {
        this.pager = pager;
        this.loading = true;
        const res = await this.contentService.fetchList(pager);
        this.loading = false;
        this.total = res.total;
        this.contentList = res.result;
        if (res.error) {
          this.msg.error(res.error);
        }
      });
  }

  search(search: string) {
    this.paginator.search(search);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginator.onQueryParamsChange(params);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
