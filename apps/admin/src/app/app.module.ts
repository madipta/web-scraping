import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { InMemoryCache } from "@apollo/client/core";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
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
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: "enabled" }),
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "http://localhost:3333/graphql",
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class AppModule {}
