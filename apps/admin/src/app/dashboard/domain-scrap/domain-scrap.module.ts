import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DomainScrapComponent } from "./domain-scrap.component";

const routes: Routes = [
  {
    path: "",
    component: DomainScrapComponent,
  },
];

@NgModule({
  declarations: [DomainScrapComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DomainScrapModule {}
