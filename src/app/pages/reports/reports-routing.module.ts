import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'flour-improvers',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
