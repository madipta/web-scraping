import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GqlDomainPageListResult } from "../shared/gql/dto/domain.dto";
import { DomainPagingService } from "../shared/services/domain-paging.service";
import { DomainService } from "../shared/services/domain.service";
import { ScraperService } from "../shared/services/scraper.service";

@Component({
  selector: "web-scraping-domain-list",
  templateUrl: "./domain-list.component.html",
  styleUrls: ["./domain-list.component.scss"],
})
export class DomainListComponent implements OnInit, OnDestroy {
  vm$ = this.domainPagingService.data$;
  notifier = new Subject();

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private domainService: DomainService,
    private domainPagingService: DomainPagingService,
    private scraperService: ScraperService
  ) {}

  ngOnInit(): void {
    this.domainPagingService.error$
      .pipe(takeUntil(this.notifier))
      .subscribe((error) => this.msg.error(error));
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  search(search: string) {
    this.domainPagingService.search(search);
  }

  refresh() {
    this.domainPagingService.refresh();
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.domainPagingService.onQueryParamsChange(params);
  }

  async delete(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.domainService.delete({ id });
    this.msg.remove(msgId);
    if (!result.ok) {
      this.msg.error(result.error || "Deleting domain failed!");
    } else {
      this.msg.success("Domain deleted!");
      this.domainPagingService.refresh();
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
