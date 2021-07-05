import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CurrentDashboardComponent } from './current-dashboard/current-dashboard.component';
import { CurrentDashboardVisualizationComponent } from './current-dashboard-visualization/current-dashboard-visualization.component';
import { AnalysisDashboardComponent } from './analysis-dashboard/analysis-dashboard.component';

export const containers: any[] = [
  DashboardComponent,
  DashboardHomeComponent,
  CurrentDashboardComponent,
  CurrentDashboardVisualizationComponent,
  AnalysisDashboardComponent,
];

export * from './dashboard/dashboard.component';
export * from './dashboard-home/dashboard-home.component';
export * from './current-dashboard/current-dashboard.component';
export * from './current-dashboard-visualization/current-dashboard-visualization.component';
