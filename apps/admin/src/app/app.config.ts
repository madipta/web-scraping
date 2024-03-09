import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppApolloModule } from './app.apollo.provider';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.router';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppApolloModule),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
  ],
};
