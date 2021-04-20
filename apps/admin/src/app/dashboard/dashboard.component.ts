import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "web-scraping-admin-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  isCollapsed = false;

  constructor(public router: Router) {}
}
