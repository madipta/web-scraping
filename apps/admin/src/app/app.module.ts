import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
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
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink) {
    //     // Create an http link:
    //     const http = httpLink.create({
    //       uri: "http://localhost:3333/graphql",
    //     });

    //     // Create a WebSocket link:
    //     const ws = new WebSocketLink({
    //       uri: `ws://localhost:3333/`,
    //       options: {
    //         reconnect: true,
    //       },
    //     });

    //     // using the ability to split links, you can send data to each link
    //     // depending on what kind of operation is being sent
    //     const link = split(
    //       // split based on operation type
    //       ({ query }) => {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         const { kind, operation } = getMainDefinition(query) as any;
    //         return (
    //           kind === "OperationDefinition" && operation === "subscription"
    //         );
    //       },
    //       ws,
    //       http
    //     );

    //     return {
    //       cache: new InMemoryCache(),
    //       link,
    //     };
    //   },
    //   deps: [HttpLink],
    // },
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
