import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  imports: [RouterModule],
  selector: "web-scraping-root",
  standalone: true,
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
