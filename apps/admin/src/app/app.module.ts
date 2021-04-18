import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "dashboard",
    loadChildren: async () =>
      (await import("./dashboard/dashboard.module")).DashboardModule,
    canActivateChild: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: async () =>
      (await import("./login/login.module")).LoginModule,
  },
  { path: "**", redirectTo: "dashboard", pathMatch: "full" },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabled" }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
