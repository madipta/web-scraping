import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DomainUpdateComponent } from "./domain-update.component";

const routes: Routes = [
  {
    path: "",
    component: DomainUpdateComponent,
  },
];

@NgModule({
  declarations: [DomainUpdateComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DomainUpdateModule {}
