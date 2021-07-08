import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceHomeComponent } from './pages/maintenance-home/maintenance-home.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
