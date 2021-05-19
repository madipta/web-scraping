import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzIconModule } from "ng-zorro-antd/icon";
import { DashboardComponent } from "./dashboard.component";

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
      {
        path: "jobs-settings",
        loadChildren: async () =>
          (await import("./jobs-settings/jobs-settings.module"))
            .JobsSettingsModule,
      },
    ],
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    HttpClientModule,
    RouterModule.forChild(routes),
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
  ],
})
export class DashboardModule {}
