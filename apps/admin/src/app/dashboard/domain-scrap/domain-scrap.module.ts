import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DomainScrapModule {}
