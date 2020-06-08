import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./pages/dashboard/pages/dashboard/dashboard.module').then(
        m => m.DashboardModule
      )
  },
  {
    path: '',
    redirectTo: 'dashboards',
    pathMatch: 'full'
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./pages/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./pages/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./pages/resources/resources.module').then(m => m.ResourcesModule)
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./pages/forms/forms.module').then(m => m.FormsModule)
  },
  {
    path: 'data-entry',
    loadChildren: () =>
      import('./pages/data-entry/data-entry.module').then(
        m => m.DataEntryModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
