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
  content: string;
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
    if (res) {
      this.home = res.link.domain.home;
      this.url = res.link.url;
      this.content = res.content.replace(/\.\s/g, '.\n\n');
    } else {
      this.msg.error("Content failed to open!");
      this.location.back();
    }
  }
}
