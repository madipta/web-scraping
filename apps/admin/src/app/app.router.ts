import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'content-list',
        loadComponent: () =>
          import('./dashboard/content-list/content-list.component').then(
            (m) => m.ContentListComponent
          ),
      },
      {
        path: 'content',
        loadComponent: () =>
          import('./dashboard/content/content.component').then(
            (m) => m.ContentComponent
          ),
      },
      {
        path: 'domain-list',
        loadComponent: () =>
          import('./dashboard/domain-list/domain-list.component').then(
            (m) => m.DomainListComponent
          ),
      },
      {
        path: 'domain-setting',
        loadComponent: () =>
          import('./dashboard/domain-setting/domain-setting.component').then(
            (m) => m.DomainSettingComponent
          ),
      },
      {
        path: 'domain-update',
        loadComponent: () =>
          import('./dashboard/domain-update/domain-update.component').then(
            (m) => m.DomainUpdateComponent
          ),
      },
      {
        path: 'link-list',
        loadComponent: () =>
          import('./dashboard/link-list/link-list.component').then(
            (m) => m.LinkListComponent
          ),
      },
      {
        path: 'jobs-list',
        loadComponent: () =>
          import('./dashboard/jobs-list/jobs-list.component').then(
            (m) => m.JobsListComponent
          ),
      },
      { path: '**', redirectTo: 'domain-list', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
