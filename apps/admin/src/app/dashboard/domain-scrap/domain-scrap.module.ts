import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DomainScrapComponent } from "./domain-scrap.component";

const routes: Routes = [
  {
    path: "",
    component: DomainScrapComponent,
  },
];

@NgModule({
  declarations: [DomainScrapComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DomainScrapModule {}
