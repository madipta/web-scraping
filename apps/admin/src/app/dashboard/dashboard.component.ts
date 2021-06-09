import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContentService } from "./shared/services/content.service";
import { DomainService } from "./shared/services/domain.service";
import { ScrapeJobService } from "./shared/services/scrape-job.service";
import { WsService } from "./shared/services/ws.service";

@Component({
  selector: "web-scraping-admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  domainCount = 0;
  contentCount = 0;
  queuesCount = 0;
  loadingErrorCount = 0;
  scrapingErrorCount = 0;
  successCount = 0;

  constructor(
    public router: Router,
    private wsService: WsService,
    private domainService: DomainService,
    private contentService: ContentService,
    private jobService: ScrapeJobService
  ) {}

  async ngOnInit() {
    this.domainCount = await this.domainService.getCount();
    this.contentCount = await this.contentService.getCount();
    this.queuesCount = await this.jobService.getCount("created");
    this.loadingErrorCount = await this.jobService.getCount("loading-error");
    this.scrapingErrorCount = await this.jobService.getCount("scraping-error");
    this.successCount = await this.jobService.getCount("success");
    this.wsService.JobCount$.subscribe(({ data }) => {
      this.contentCount = data.content;
      this.queuesCount = data.created;
      this.loadingErrorCount = data.loadingError;
      this.scrapingErrorCount = data.scrapingError;
      this.successCount = data.success;
    });
  }
}
