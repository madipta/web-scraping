import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "web-scraping-checklist",
  template: `<i
    nz-icon
    [nzType]="icon"
    [ngStyle]="{ color: value ? trueColor : falseColor }"
  ></i>`,
})
export class ChecklistComponent implements OnInit {
  @Input() value: boolean = null;
  @Input() trueColor = "green";
  @Input() falseColor = "red";
  @Input() trueIcon = "check";
  @Input() falseIcon = "close";
  icon = this.falseIcon;

  ngOnInit(): void {
    if (this.value === true) {
      this.icon = this.trueIcon;
    } else {
      this.icon = this.falseIcon;
    }
  }
}
