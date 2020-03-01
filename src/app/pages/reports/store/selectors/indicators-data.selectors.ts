import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  IndicatorDataState,
  indicatorDataAdapter
} from '../states/indicator-data.states';

export const getIndicatorsDataAnalyticsState: MemoizedSelector<
  object,
  IndicatorDataState
> = createFeatureSelector<IndicatorDataState>('indicatorAnalyticsData');

export const {
  selectEntities: getIndicatorAnalyticsEntities,
  selectAll: getAnalytics
} = indicatorDataAdapter.getSelectors(getIndicatorsDataAnalyticsState);

export const getIndicatorAnalyticsById = createSelector(
  getIndicatorAnalyticsEntities,
  (entities, props) => entities[props.id]
);

export const getIndicatorAnalyticsLoadedState = createSelector(
  getIndicatorsDataAnalyticsState,
  (state: IndicatorDataState) => state.loaded
);
