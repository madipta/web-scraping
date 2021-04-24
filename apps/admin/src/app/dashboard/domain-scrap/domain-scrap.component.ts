import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { DomainService } from "../domain.service";

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
      loadeMoreIndexPath: [null],
    });
  }

  async loadDomain() {
    const res = await this.domainService.get({ id: this.selectedId });
    if (res["ok"]) {
      this.domain = res["result"];
      this.form.patchValue(this.domain);
    } else {
      this.msg.error(res["error"]);
      this.location.back();
    }
  }

  resetForm(): void {
    this.form.reset();
  }
}
