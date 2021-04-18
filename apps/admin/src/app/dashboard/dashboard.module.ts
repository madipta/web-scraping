import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { NzFormModule } from "ng-zorro-antd/form";
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
        path: "domain-list",
        loadChildren: async () =>
          (await import("./domain-list/domain-list.module")).DomainListModule,
      },
      {
        path: "domain-register",
        loadChildren: async () =>
          (await import("./domain-register/domain-register.module"))
            .DomainRegisterModule,
      },
      {
        path: "domain-scrap",
        loadChildren: async () =>
          (await import("./domain-scrap/domain-scrap.module"))
            .DomainScrapModule,
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
        path: "link-update",
        loadChildren: async () =>
          (await import("./link-update/link-update.module")).LinkUpdateModule,
      },
      {
        path: "link-scrap",
        loadChildren: async () =>
          (await import("./link-scrap/link-scrap.module")).LinkScrapModule,
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
