import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DomainRegisterComponent } from "./domain-register.component";

const routes: Routes = [
  {
    path: "",
    component: DomainRegisterComponent,
  },
];

@NgModule({
  declarations: [DomainRegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DomainRegisterModule {}
