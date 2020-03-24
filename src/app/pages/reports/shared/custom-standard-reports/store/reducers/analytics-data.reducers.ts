import { createReducer, on } from '@ngrx/store';
import {
  initialAnalyticsDataState,
  analyticsDataAdapter
} from '../states/analytics-data.states';
import {
  loadAnalyticsData,
  addLoadedAnalyticsData,
  loadingAnalyticsDataFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

const reducer = createReducer(
  initialAnalyticsDataState,
  on(loadAnalyticsData, state => ({
    ...state,
    ...loadingBaseState,
    countOfLoadedIndicator: 0
  })),
  on(addLoadedAnalyticsData, (state, { data }) =>
    analyticsDataAdapter.addOne(data, {
      ...state,
      ...loadedBaseState,
      countOfLoadedIndicator: state.countOfLoadedIndicator + 1
    })
  ),
  on(loadingAnalyticsDataFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  }))
);

export function analyticsDataReducer(state, action) {
  return reducer(state, action);
}
