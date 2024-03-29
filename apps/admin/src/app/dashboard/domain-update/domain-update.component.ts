import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { DomainService } from "../shared/services/domain.service";
import { SharedModule } from "../shared/shared.module";

@Component({
  imports: [SharedModule],
  selector: "web-scraping-domain-update",
  standalone: true,
  templateUrl: "./domain-update.component.html",
})
export class DomainUpdateComponent implements OnInit {
  selectedId = 0;
  form!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private msg: NzMessageService,
    private domainService: DomainService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params["id"]) {
        this.selectedId = +params["id"];
      } else {
        this.selectedId = 0;
      }
    });
    this.form = this.fb.group({
      home: [null, [Validators.required]],
      adminEmail: [null, [Validators.email]],
      active: [true],
      disabled: [false],
    });
    if (!this.selectedId) {
      this.form.controls["active"].setValue(true);
    } else {
      this.getDomain();
    }
  }

  async getDomain() {
    const msgId = this.msg.loading("loading...", { nzDuration: 0 }).messageId;
    const domain = await this.domainService.get({ id: this.selectedId });
    this.form.patchValue(domain.result);
    this.msg.remove(msgId);
  }

  async submitForm() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (!this.form.valid) {
      return;
    }
    const values = this.form.getRawValue();
    if (this.selectedId) {
      values.id = this.selectedId;
    }
    const msgId = this.msg.loading("progress...", { nzDuration: 0 }).messageId;
    const res = await this.domainService.createOrUpdate(values);
    this.msg.remove(msgId);
    if (!res.ok) {
      this.msg.error(res.error || "Failed!");
    } else {
      this.msg.success("Success!");
      this.location.back();
    }
  }
}
