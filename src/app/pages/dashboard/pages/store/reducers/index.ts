import { StoreModule } from '@ngrx/store';
import { dashboardObjectReducer } from './dashboard.reducer';
import { dashboardSettingsReducer } from './dashboard-settings.reducer';
import { dashboardVisualizationReducer } from './dashboard-visualization.reducer';
import { dashboardGroupReducer } from './dashboard-groups.reducer';

export const dashboardReducers: any[] = [
  StoreModule.forFeature('dashboardObject', dashboardObjectReducer),
  StoreModule.forFeature('dashboardGroups', dashboardGroupReducer),
  StoreModule.forFeature('dashboardSettings', dashboardSettingsReducer),
  StoreModule.forFeature(
    'dashboardVisualization',
    dashboardVisualizationReducer
  )
];
