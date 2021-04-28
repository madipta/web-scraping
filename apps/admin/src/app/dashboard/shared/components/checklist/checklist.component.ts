import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "web-scraping-checklist",
  template: `<i
    nz-icon
    [nzType]="icon"
    [ngClass]="{ checked: value, uncheked: !value }"
  ></i>`,
  styles: [".checked { color: green; }", ".uncheked { color: red; }"],
})
export class ChecklistComponent implements OnInit {
  @Input() value: boolean = null;
  icon = "close";

  ngOnInit(): void {
    if (this.value === true) {
      this.icon = "check";
    }
  }
}
