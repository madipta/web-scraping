import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./shared/services/auth.service";
import { ScrapeJobService } from "./shared/services/scrape-job.service";

@Component({
  selector: "web-scraping-admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  jobCount$ = this.jobService.jobCount$;

  constructor(
    public router: Router,
    private authService: AuthService,
    private jobService: ScrapeJobService
  ) {}

  signout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
