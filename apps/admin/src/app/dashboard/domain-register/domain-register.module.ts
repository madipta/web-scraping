import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DomainRegisterComponent } from "./domain-register.component";

const routes: Routes = [
  {
    path: "",
    component: DomainRegisterComponent,
  },
];

@NgModule({
  declarations: [DomainRegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DomainRegisterModule {}
