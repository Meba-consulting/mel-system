import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomStandardReportsComponent } from './pages/custom-standard-reports/custom-standard-reports.component';

const routes: Routes = [
  {
    path: '',
    component: CustomStandardReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomStandardReportsRoutingModule {}
