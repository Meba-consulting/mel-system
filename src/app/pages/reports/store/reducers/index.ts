import { StoreModule } from '@ngrx/store';
import { reportsListReducer } from './reports-list.reducers';
import { indicatorDataReducer } from './indicator-data.reducer';

export const reducers: any[] = [
  StoreModule.forFeature('reportsList', reportsListReducer),
  StoreModule.forFeature('indicatorAnalyticsData', indicatorDataReducer)
];
