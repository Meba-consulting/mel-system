import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import {
  AnalyticsDataState,
  analyticsDataAdapter
} from '../states/analytics-data.states';

export const getAnalyticsDataState: MemoizedSelector<
  object,
  AnalyticsDataState
> = createFeatureSelector<AnalyticsDataState>('analyticsData');

export const {
  selectEntities: getAnalyticsDataEntities,
  selectAll: getAnalyticsData
} = analyticsDataAdapter.getSelectors(getAnalyticsDataState);

export const getAnalyticsDataById = createSelector(
  getAnalyticsDataEntities,
  (entities, props) => entities[props.id]
);

export const getCountOfLoadedIndicators = createSelector(
  getAnalyticsDataState,
  (state: AnalyticsDataState) => state.countOfLoadedIndicator
);
