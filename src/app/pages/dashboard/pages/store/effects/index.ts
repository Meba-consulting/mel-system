import { DashboardSettingsEffects } from './dashboard-settings.effects';
import { DashboardEffects } from './dashboard.effects';
import { DashboardVisualizationEffects } from './dashboard-visualization.effects';
import { DashboardGroupsEffects } from './dashboard-groups.effects';

export const effects: any[] = [
  DashboardSettingsEffects,
  DashboardEffects,
  DashboardVisualizationEffects,
  DashboardGroupsEffects
];
