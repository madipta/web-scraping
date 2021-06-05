import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ContentService } from "./shared/services/content.service";
import { DomainService } from "./shared/services/domain.service";
import { ScrapeJobService } from "./shared/services/scrape-job.service";

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
    private domainService: DomainService,
    private contentService: ContentService,
    private scrapeJobService: ScrapeJobService
  ) {}

  async ngOnInit() {
    this.domainCount = await this.domainService.getCount();
    this.contentCount = await this.contentService.getCount();
    this.queuesCount = await this.scrapeJobService.getCount("created");
    this.loadingErrorCount = await this.scrapeJobService.getCount("loading-error");
    this.scrapingErrorCount = await this.scrapeJobService.getCount("scraping-error");
    this.successCount = await this.scrapeJobService.getCount("success");
  }
}
