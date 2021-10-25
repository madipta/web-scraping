import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { DomainSettingService } from "../shared/services/domain-setting.service";

@Component({
  selector: "web-scraping-domain-setting",
  templateUrl: "./domain-setting.component.html",
  styleUrls: ["./domain-setting.component.scss"],
})
export class DomainSettingComponent implements OnInit {
  form!: FormGroup;
  public domainHome: string;
  selectedId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private settingService: DomainSettingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (!params?.id) {
        this.location.back();
        return;
      }
      this.selectedId = +params.id;
      this.loadDomain();
    });
    this.form = this.fb.group({
      indexUrl: [null],
      indexFeedUrl: [null],
      indexPath: [null],
      nextPath: [null],
      articlePath: [null],
      headerPath: [null],
      categoryPath: [null],
      publishDatePath: [null],
      imagePath: [null],
      scrapIndexMethod: ["web"],
      scrapIndexPaging: ["paging"],
      scrapIndexFormat: ["html"],
      scrapArticleMethod: ["web"],
      scrapArticleFormat: ["html"]
    });
  }

  async loadDomain() {
    const msgId = this.msg.loading("loading", { nzDuration: 0 }).messageId;
    const res = await this.settingService.get({ id: this.selectedId });
    this.msg.remove(msgId);
    if (res.ok) {
      this.domainHome = res.result.domain?.home;
      this.form.patchValue(res.result);
    } else {
      this.msg.error(res.error || "Domain loading failed!");
      this.location.back();
    }
  }

  async save() {
    const msgId = this.msg.loading("loading", { nzDuration: 0 }).messageId;
    const values = this.form.getRawValue();
    const dto = { ...values, id: this.selectedId };
    const res = await this.settingService.update(dto);
    this.msg.remove(msgId);
    if (res.ok) {
      this.router.navigate(["dashboard", "domain-list"]);
      this.msg.success(`Saved!`);
      return;
    }
    this.msg.error(res.error || `failed!`);
  }
}
