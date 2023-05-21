import { ApplicationConfig } from "@angular/core";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { AppApolloModule } from "./app.apollo.provider";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.router";
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppApolloModule),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
  ],
};
