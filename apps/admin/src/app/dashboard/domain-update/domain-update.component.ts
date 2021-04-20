import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DomainUpdateService } from "./domain-update.service";

@Component({
  selector: "web-scraping-domain-update",
  templateUrl: "./domain-update.component.html",
  styleUrls: ["./domain-update.component.scss"],
})
export class DomainUpdateComponent implements OnInit {
  selectedId = 0;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private domainUpdateService: DomainUpdateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params && params.id) {
        this.selectedId = +params.id;
      } else {
        this.selectedId = 0;
      }
    });
    this.validateForm = this.fb.group({
      home: [null, [Validators.required]],
      indexUrl: [null],
      indexPath: [null],
      contentPath: [null],
      categoryPath: [null],
      headerPath: [null],
      adminEmail: [null, [Validators.email]],
      active: [false],
      disabled: [false],
    });
    if (!this.selectedId) {
      this.validateForm.controls["active"].setValue(true);
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.valid) {
      return;
    }
    const values = this.validateForm.getRawValue();
    if (this.selectedId) {
      values.id = this.selectedId;
    }
    this.domainUpdateService.createOrUpdate(values);
  }
}
