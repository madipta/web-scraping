import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { AuthService } from "./shared/services/auth.service";
import { DomainService } from "./shared/services/domain.service";
import { ScrapeJobService } from "./shared/services/scrape-job.service";
import { WsService } from "./shared/services/ws.service";

@Component({
  selector: "web-scraping-admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  domainCount = 0;
  jobCount$: Observable<any>;

  constructor(
    public router: Router,
    private authService: AuthService,
    private wsService: WsService,
    private domainService: DomainService,
    private jobService: ScrapeJobService
  ) {}

  async ngOnInit() {
    this.domainCount = await this.domainService.getCount();
    this.jobCount$ = this.wsService.connection.pipe(
      filter((v) => v.data && v.event === "jobCount"),
      map((v) => v.data)
    );
    this.jobService.initJobCount();
  }

  signout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
