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
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private msg: NzMessageService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params.linkId) {
        this.getContent(+params.linkId);
      } else {
        this.location.back();
      }
    });
  }

  async getContent(linkId: number) {
    const msgId = this.msg.loading("loading...", { nzDuration: 0 }).messageId;
    const res = await this.contentService.get({ linkId });
    this.msg.remove(msgId);
    if (res.ok) {
      const result = res.result as any;
      this.text = result.text.replace(/\.\s/g, '.\n\n');
      this.home = result.domainHome;
      this.url = result.linkUrl;
    } else {
      this.msg.error("Content failed to open!");
      this.location.back();
    }
  }
}
