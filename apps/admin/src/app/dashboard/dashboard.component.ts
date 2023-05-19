import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "./shared/services/auth.service";
import { ScrapeJobService } from "./shared/services/scrape-job.service";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";

@Component({
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
  ],
  selector: "web-scraping-admin-dashboard",
  standalone: true,
  styleUrls: ["./dashboard.component.css"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  jobCount$ = this.jobService.jobCount$;

  constructor(
    public router: Router,
    private authService: AuthService,
    private jobService: ScrapeJobService
  ) { }

  ngOnInit(): void {
    this.jobService.initJobCount();
  }

  signout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
