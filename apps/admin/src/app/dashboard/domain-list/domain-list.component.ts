import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GqlDomainPageListResult } from "../shared/gql/dto/domain.dto";
import { DomainService } from "../shared/services/domain.service";
import { ScraperService } from "../shared/services/scraper.service";
import { SharedModule } from "../shared/shared.module";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { NzPagingService } from "../shared/services/nz-paging.service";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-domain-list",
  standalone: true,
  styleUrls: ["./domain-list.component.scss"],
  templateUrl: "./domain-list.component.html",
})
export class DomainListComponent implements OnInit, OnDestroy {
  pagingService = new NzPagingService({ sortBy: "home" });
  vm$ = this.pagingService.data$;
  destroy$ = new Subject();

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private domainService: DomainService,
    private scraperService: ScraperService
  ) {}

  ngOnInit(): void {
    this.pagingService.pager$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (pager) => {
        this.pagingService.load(this.domainService.fetchList(pager));
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

  async delete(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.domainService.delete({ id });
    this.msg.remove(msgId);
    if (!result.ok) {
      this.msg.error(result.error || "Deleting domain failed!");
    } else {
      this.msg.success("Domain deleted!");
      this.pagingService.refresh();
    }
  }

  async scrap(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapIndex(id);
    this.msg.remove(msgId);
    if (!result.ok) {
      this.msg.error(result.error || "Scraping domain failed!");
    } else {
      this.msg.success("Domain scraping job added!");
    }
  }

  gotoLinks(data: GqlDomainPageListResult) {
    this.router.navigate(["dashboard", "link-list"], {
      queryParams: { id: data.id },
    });
  }
}
