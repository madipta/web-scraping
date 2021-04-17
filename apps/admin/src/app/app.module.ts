import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const appRoutes: Routes = [
  {
    path: "dashboard",
    loadChildren: async () =>
      (await import("./dashboard/dashboard.module")).DashboardModule,
    // canActivateChild: [AuthGuard],
  },
  // { path: "login", component: LoginComponent },
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
