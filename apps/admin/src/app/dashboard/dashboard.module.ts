import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "content-list",
        loadChildren: async () =>
          (await import("./content-list/content-list.module"))
            .ContentListModule,
      },
      {
        path: "content",
        loadChildren: async () =>
          (await import("./content/content.module")).ContentModule,
      },
      {
        path: "domain-list",
        loadChildren: async () =>
          (await import("./domain-list/domain-list.module")).DomainListModule,
      },
      {
        path: "domain-setting",
        loadChildren: async () =>
          (await import("./domain-setting/domain-setting.module"))
            .DomainSettingModule,
      },
      {
        path: "domain-update",
        loadChildren: async () =>
          (await import("./domain-update/domain-update.module"))
            .DomainUpdateModule,
      },
      {
        path: "link-list",
        loadChildren: async () =>
          (await import("./link-list/link-list.module")).LinkListModule,
      },
      {
        path: "jobs-list",
        loadChildren: async () =>
          (await import("./jobs-list/jobs-list.module")).JobsListModule,
      },
      { path: "**", redirectTo: "domain-list", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzIconModule,
  ],
})
export class DashboardModule {}
