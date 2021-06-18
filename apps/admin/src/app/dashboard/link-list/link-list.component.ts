import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { combineLatest, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { GqlGetDomainResult } from "../shared/gql/dto/domain.dto";
import { GqlLinkPageListResult } from "../shared/gql/dto/link.dto";
import { DomainService } from "../shared/services/domain.service";
import { LinkService } from "../shared/services/link.service";
import { NzDataPaginator } from "../shared/services/nz-data-paginator";
import { ScraperService } from "../shared/services/scraper.service";

@Component({
  selector: "web-scraping-link-list",
  templateUrl: "./link-list.component.html",
  styleUrls: ["./link-list.component.scss"],
})
export class LinkListComponent implements OnInit, OnDestroy {
  domain: GqlGetDomainResult;
  total = 1;
  linkList: GqlLinkPageListResult[] = [];
  loading = true;
  paginator = new NzDataPaginator({ sortField: "title" });
  pager = this.paginator.getPager();
  notifier = new Subject();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private msg: NzMessageService,
    private domainService: DomainService,
    private linkService: LinkService,
    private scraperService: ScraperService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(take(1))
      .subscribe(async ([, query]) => {
        this.domain = await this.getDomain(+query.id);
        this.paginator.pager$
          .pipe(takeUntil(this.notifier))
          .subscribe(async (pager) => {
            this.pager = pager;
            if (!this.domain) {
              return;
            }
            this.loading = true;
            const res = await this.linkService.fetchList(
              this.pager,
              this.domain.id
            );
            this.loading = false;
            this.total = res.total;
            this.linkList = res.result;
          });
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  search(search: string) {
    this.paginator.search(search);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.paginator.onQueryParamsChange(params);
  }

  async getDomain(id: number) {
    const res = await this.domainService.get({ id });
    if (res.ok) {
      return res.result;
    }
    this.msg.error("Error getting domain!");
    this.location.back();
    return null;
  }

  async delete(id) {
    const result = await this.linkService.delete(id);
    if (result.ok) {
      this.msg.success("Deleted!");
      this.paginator.refresh();
    } else {
      this.msg.error("Delete failed!");
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
      this.msg.error("Create content scraping job failed!");
    }
    this.paginator.refresh();
  }

  async scrapOne(linkId: number) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.scraperService.scrapContent(linkId);
    this.msg.remove(msgId);
    if (result.ok) {
      this.msg.success("Scraping content job created!");
    } else {
      this.msg.error("Create content scraping job failed!");
    }
    this.paginator.refresh();
  }

  gotoContent(data: GqlLinkPageListResult) {
    if (!data.scraped) {
      this.msg.error("Not scraped yet!");
      return;
    }
    this.router.navigate(["dashboard", "content"], {
      queryParams: { id: data.id },
    });
  }
}
