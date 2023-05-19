import { provideHttpClient } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppApolloModule } from './app/app.apollo.provider';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.router';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppApolloModule),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
  ],
}).catch((err) => console.error(err));
