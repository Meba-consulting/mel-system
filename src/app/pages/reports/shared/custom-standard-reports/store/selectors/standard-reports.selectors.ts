import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  StandardReportConfigsState,
  standardReportsConfigsAdapter
} from '../states/standard-reports.states';

export const getStandardReportConfigsState: MemoizedSelector<
  object,
  StandardReportConfigsState
> = createFeatureSelector<StandardReportConfigsState>('standardReportsConfigs');

export const {
  selectEntities: getStandardReportConfigsEntities,
  selectAll: getStandardReportConfigs
} = standardReportsConfigsAdapter.getSelectors(getStandardReportConfigsState);

export const getStandardReportConfigsById = createSelector(
  getStandardReportConfigsEntities,
  (entities, props) => entities[props.id]
);
