import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./pages/dashboard/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    redirectTo: 'dashboards',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/standard-reports/standard-reports.module').then(
        (m) => m.StandardReportsModule
      ),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./pages/resources/resources.module').then(
        (m) => m.ResourcesModule
      ),
  },
  {
    path: 'data-entry',
    loadChildren: () =>
      import('./pages/data-entry/data-entry.module').then(
        (m) => m.DataEntryModule
      ),
  },
  {
    path: 'general-registration',
    loadChildren: () =>
      import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./pages/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
