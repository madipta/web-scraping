import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "web-scraping-link-list",
  templateUrl: "./link-list.component.html",
  styleUrls: ["./link-list.component.scss"],
})
export class LinkListComponent implements OnInit {
  domainId = 0;
  title = "All";

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.domainId = +params.id;
      } else {
        this.domainId = 0;
      }
    });
  }
}
