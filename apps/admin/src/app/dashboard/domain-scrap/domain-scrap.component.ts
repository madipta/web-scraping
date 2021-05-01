import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { DomainService } from "../shared/services/domain.service";

@Component({
  selector: "web-scraping-domain-scrap",
  templateUrl: "./domain-scrap.component.html",
  styleUrls: ["./domain-scrap.component.scss"],
})
export class DomainScrapComponent implements OnInit {
  form!: FormGroup;
  public domain: { home: string };
  selectedId = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private domainService: DomainService
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
      indexPath: [null],
      loadmoreIndexPath: [null],
    });
  }

  async loadDomain() {
    const msgId = this.msg.loading("loading", { nzDuration: 0 }).messageId;
    const res = await this.domainService.get({ id: this.selectedId });
    this.msg.remove(msgId);
    if (res.ok) {
      this.domain = res.result;
      this.form.patchValue(this.domain);
    } else {
      this.msg.error("res.error");
      this.location.back();
    }
  }

  async save() {
    const msgId = this.msg.loading("loading", { nzDuration: 0 }).messageId;
    const values = this.form.getRawValue();
    const dto = { ...values, id: this.selectedId };
    const res = await this.domainService.createOrUpdate(dto);
    this.msg.remove(msgId);
    if (res.ok) {
      this.msg.success(`Saved!`);
    } else {
      this.msg.error(`failed! \n\n${res.error}`);
    }
  }

  async scrap() {
    const msgId = this.msg.loading("loading", { nzDuration: 0 }).messageId;
    const res = await this.domainService.scrapIndex(`${this.selectedId}`);
    this.msg.remove(msgId);
    if (res.ok) {
      this.msg.success(`${res.result} links scraped!`);
    } else {
      this.msg.error(`failed! \n\n${res.error}`);
    }
  }
}
