import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/services/auth.service";
import { ScrapeJobService } from "./shared/services/scrape-job.service";
import { WsService } from "./shared/services/ws.service";

@Component({
  selector: "web-scraping-admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  jobCount$ = this.wsService.jobCount$;

  constructor(
    public router: Router,
    private authService: AuthService,
    private wsService: WsService,
    private jobService: ScrapeJobService
  ) {}

  async ngOnInit() {
    this.jobService.initJobCount();
  }

  signout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
