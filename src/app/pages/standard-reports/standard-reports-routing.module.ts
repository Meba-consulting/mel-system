import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: ':type/:id',
    component: ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardReportRoutingModule {}
