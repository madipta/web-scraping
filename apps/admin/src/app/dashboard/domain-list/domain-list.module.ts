import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DomainListComponent } from "./domain-list.component";

const routes: Routes = [
  {
    path: "",
    component: DomainListComponent,
  },
];

@NgModule({
  declarations: [DomainListComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DomainListModule {}
