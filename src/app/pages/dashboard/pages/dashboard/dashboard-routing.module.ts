import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DashboardComponent,
  DashboardHomeComponent,
  CurrentDashboardComponent,
  CurrentDashboardVisualizationComponent,
} from './containers';
import { AnalysisDashboardComponent } from './containers/analysis-dashboard/analysis-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: ':id/fullScreen/:visualizationId',
        component: CurrentDashboardVisualizationComponent,
      },
      {
        path: ':id',
        component: CurrentDashboardComponent,
      },
    ],
  },
  {
    path: 'analysis/playground',
    component: AnalysisDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
