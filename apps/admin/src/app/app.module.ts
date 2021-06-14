import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { AppApolloProvider } from "./app.apollo.provider";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./guards/auth.guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: async () =>
      (await import("./dashboard/dashboard.module")).DashboardModule,
      canActivate: [AuthGuard],
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
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabled" }),
  ],
  providers: [AppApolloProvider],
})
export class AppModule {}
