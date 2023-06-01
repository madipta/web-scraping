import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { GqlGetDomainResult } from "../shared/gql/dto/domain.dto";
import { GqlLinkPageListResult } from "../shared/gql/dto/link.dto";
import { DomainService } from "../shared/services/domain.service";
import { LinkService } from "../shared/services/link.service";
import { ScraperService } from "../shared/services/scraper.service";
import { TableSearchComponent } from "../shared/components/table-search/table-search.component";
import { SharedModule } from "../shared/shared.module";
import { NzPagingService } from "../shared/services/nz-paging.service";

@Component({
  imports: [SharedModule, TableSearchComponent],
  selector: "web-scraping-link-list",
  standalone: true,
  templateUrl: "./link-list.component.html",
})
export class LinkListComponent implements OnInit, OnDestroy {
  pagingService = new NzPagingService({ sortBy: "title" });
  domain: GqlGetDomainResult;
  vm = this.pagingService.data;
  destroy$ = new Subject();

  route = inject(ActivatedRoute);
  router = inject(Router);

  private domainService = inject(DomainService);
  private linkService = inject(LinkService);
  private location = inject(Location);
  private msg = inject(NzMessageService);
  private scraperService = inject(ScraperService);

  ngOnInit(): void {
    this.pagingService.pager$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (pager) => {
        const domainId = +pager.filter.domainId;
        if (!isNaN(domainId)) {
          return this.pagingService.load(
            this.linkService.fetchList(pager, domainId)
          );
        }
      });
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(take(1))
      .subscribe(async ([, query]) => {
        const domainId = +query.id;
        this.domain = await this.getDomain(domainId);
        this.pagingService.setFilter({ domainId });
      });
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

  async getDomain(id: number) {
    const result = await this.domainService.get({ id });
    if (result.ok) {
      return result.result;
    }
    this.msg.error(result.error || "Error getting domain!");
    this.location.back();
    return null;
  }

  async delete(id) {
    const result = await this.linkService.delete(id);
    if (!result.ok) {
      this.msg.error(result.error || "Delete failed!");
    } else {
      this.msg.success("Deleted!");
      this.pagingService.refresh();
    }
  }

  async scrapAll() {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapeContentByDomain(
      this.domain.id
    );
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Scraping content job created!");
    } else {
      this.msg.error(result.error || "Create content scraping job failed!");
    }
  }

  async scrapOne(linkId: number) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapContent(linkId);
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Scraping content job created!");
    } else {
      this.msg.error(result.error || "Create content scraping job failed!");
    }
  }

  gotoContent(data: GqlLinkPageListResult) {
    this.router.navigate(["dashboard", "content"], {
      queryParams: { id: data.id },
    });
  }
}
