import { StoreModule } from '@ngrx/store';
import { standardReportConfigsReducer } from './standard-reports.reducers';
import { analyticsDataReducer } from './analytics-data.reducers';

export const reducers: any[] = [
  StoreModule.forFeature(
    'standardReportsConfigs',
    standardReportConfigsReducer
  ),
  StoreModule.forFeature('analyticsData', analyticsDataReducer)
];
