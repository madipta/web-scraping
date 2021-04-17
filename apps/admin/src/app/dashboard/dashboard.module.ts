import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { DashboardComponent } from "./dashboard.component";
import { NzIconModule } from "ng-zorro-antd/icon";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NzFormModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ],
})
export class DashboardModule {}
