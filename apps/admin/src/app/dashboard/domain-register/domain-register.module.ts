import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { DomainRegisterComponent } from "./domain-register.component";

const routes: Routes = [
  {
    path: "",
    component: DomainRegisterComponent,
  },
];

@NgModule({
  declarations: [DomainRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzPageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
  ],
})
export class DomainRegisterModule {}
