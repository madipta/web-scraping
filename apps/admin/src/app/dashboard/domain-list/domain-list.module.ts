import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomainListComponent } from "./domain-list.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: DomainListComponent,
  },
];

@NgModule({
  declarations: [DomainListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DomainListModule {}
