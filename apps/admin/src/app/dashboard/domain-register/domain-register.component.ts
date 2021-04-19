import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "web-scraping-domain-register",
  templateUrl: "./domain-register.component.html",
  styleUrls: ["./domain-register.component.scss"],
})
export class DomainRegisterComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      home: [null, [Validators.required]],
      indexUrl: [null],
      contentPath: [null],
      categoryPath: [null],
      headerPath: [null],
      adminEmail: [null, [Validators.email]],
    });}

    submitForm(): void {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
}
