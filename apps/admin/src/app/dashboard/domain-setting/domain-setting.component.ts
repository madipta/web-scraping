import { Location } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DomainSettingService } from '../shared/services/domain-setting.service';

@Component({
  selector: 'web-scraping-domain-setting',
  templateUrl: './domain-setting.component.html',
  styleUrls: ['./domain-setting.component.scss']
})
export class DomainSettingComponent implements OnInit {
  form!: FormGroup;
  public domain: { home: string };
  selectedId = 0;

  constructor(
    private route: ActivatedRoute,
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
      indexPath: [null],
      nextPath: [null],
      scrollMore: [false],
      contentPath: [null],
      headerPath: [null],
      categoryPath: [null],
      publishDatePath: [null],
      imagePath: [null],
      indexingType: ["web"],
      loadIndexType: ["full"]
    });
  }

  async loadDomain() {
    const msgId = this.msg.loading("loading", { nzDuration: 0 }).messageId;
    const res = await this.settingService.get({ id: this.selectedId });
    this.msg.remove(msgId);
    if (res.ok) {
      this.domain = res.result.domain;
      this.form.patchValue(res.result);
    } else {
      this.msg.error("res.error");
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
      this.msg.success(`Saved!`);
    } else {
      this.msg.error(`failed! \n\n${res.error}`);
    }
  }

}
