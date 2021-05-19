import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { DomainSettingComponent } from "./domain-setting.component";

const routes: Routes = [
  {
    path: "",
    component: DomainSettingComponent,
  },
];

@NgModule({
  declarations: [DomainSettingComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class DomainSettingModule {}
