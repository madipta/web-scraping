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
import { LinkPagingService } from "../shared/services/link-paging.service";
import { LinkService } from "../shared/services/link.service";
import { ScraperService } from "../shared/services/scraper.service";

@Component({
  selector: "web-scraping-link-list",
  templateUrl: "./link-list.component.html",
  styleUrls: ["./link-list.component.scss"],
})
export class LinkListComponent implements OnInit, OnDestroy {
  domain: GqlGetDomainResult;
  vm$ = this.linkPagingService.data$;
  notifier = new Subject();

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private msg: NzMessageService,
    private domainService: DomainService,
    private linkService: LinkService,
    private scraperService: ScraperService,
    private linkPagingService: LinkPagingService
  ) {}

  ngOnInit(): void {
    this.linkPagingService.error$
      .pipe(takeUntil(this.notifier))
      .subscribe((error) => this.msg.error(error));
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(take(1))
      .subscribe(async ([, query]) => {
        const domainId = +query.id;
        this.domain = await this.getDomain(domainId);
        this.linkPagingService.setFilter({ domainId });
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  search(search: string) {
    this.linkPagingService.search(search);
  }

  refresh() {
    this.linkPagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.linkPagingService.onQueryParamsChange(params);
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
      this.linkPagingService.refresh();
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
