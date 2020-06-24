import { StoreModule } from '@ngrx/store';
import { oldReportsReducer } from './reports.reducers';

export const reducers: any[] = [
  StoreModule.forFeature('oldReports', oldReportsReducer)
];
