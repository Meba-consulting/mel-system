import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralRegistrationEntryPageComponent } from './pages/general-registration-entry-page/general-registration-entry-page.component';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsHomeComponent,
  },
  {
    path: ':id',
    component: GeneralRegistrationEntryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
