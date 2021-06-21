import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { ContentService } from "../shared/services/content.service";

@Component({
  selector: "web-scraping-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
  text: string;
  home: string;
  url: string;
  title: string;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private msg: NzMessageService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.getContent(+params.id);
      } else {
        this.location.back();
      }
    });
  }

  async getContent(id: number) {
    const msgId = this.msg.loading("loading...", { nzDuration: 0 }).messageId;
    const res = await this.contentService.get({ id });
    this.msg.remove(msgId);
    if (res.ok) {
      const result = res.result;
      this.text = result.text;
      this.home = result.domainHome;
      this.url = result.linkUrl;
      this.title = result.linkTitle;
    } else {
      this.msg.error(res.error || "Content failed to open!");
      this.location.back();
    }
  }
}
