import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DomainUpdateModule {}
