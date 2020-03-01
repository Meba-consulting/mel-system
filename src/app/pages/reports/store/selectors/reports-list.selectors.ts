import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  ReportsListState,
  reportsListAdapter
} from '../states/reports-list.states';

export const getReportsListState: MemoizedSelector<
  object,
  ReportsListState
> = createFeatureSelector<ReportsListState>('reportsList');

export const {
  selectEntities: getReportConfigsEntities,
  selectAll: getReportConfigs
} = reportsListAdapter.getSelectors(getReportsListState);

export const getReportsList = createSelector(
  getReportsListState,
  (state: ReportsListState) => state.reportsList
);

export const getReportConfigsById = createSelector(
  getReportConfigsEntities,
  (entities, props) => entities[props.id]
);
