export interface DashboardGroups {
  id: string;
  name: string;
  sortOrder?: number;
  dashboards: Array<string>;
}
