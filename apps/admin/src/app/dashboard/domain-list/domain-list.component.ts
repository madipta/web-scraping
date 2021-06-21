import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GqlDomainPageListResult } from "../shared/gql/dto/domain.dto";
import { DomainService } from "../shared/services/domain.service";
import { NzDataPaginator } from "../shared/services/nz-data-paginator";
import { ScraperService } from "../shared/services/scraper.service";

@Component({
  selector: "web-scraping-domain-list",
  templateUrl: "./domain-list.component.html",
  styleUrls: ["./domain-list.component.scss"],
})
export class DomainListComponent implements OnInit, OnDestroy {
  total = 1;
  domainList: GqlDomainPageListResult[] = [];
  loading = true;
  paginator = new NzDataPaginator({ sortField: "home" });
  pager = this.paginator.getPager();
  notifier = new Subject();

  constructor(
    public router: Router,
    private msg: NzMessageService,
    private domainService: DomainService,
    private scraperService: ScraperService
  ) {}

  async ngOnInit() {
    this.paginator.pager$
      .pipe(takeUntil(this.notifier))
      .subscribe(async (pager) => {
        this.pager = pager;
        this.loading = true;
        const res = await this.domainService.fetchList(pager);
        this.loading = false;
        this.total = res.total;
        this.domainList = res.result;
        if (res.error) {
          this.msg.error(res.error);
        }
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

  async delete(id) {
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const result = await this.domainService.delete({ id });
    this.msg.remove(msgId);
    if (!result.ok) {
      this.msg.error(result.error || "Deleting domain failed!");
    } else {
      this.msg.success("Domain deleted!");
      this.paginator.refresh();
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
