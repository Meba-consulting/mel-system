import { createReducer, on } from '@ngrx/store';
import {
  initialIndicatorDataState,
  indicatorDataAdapter
} from '../states/indicator-data.states';
import {
  loadIndicatorsData,
  addLoadedIndicatorsData,
  loadingDataByIndicatorsFail,
  resetIndicatorDataLoadedState
} from '../actions/indicators-data.actions';
import {
  loadingBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';
import { loadedBaseState } from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialIndicatorDataState,
  on(loadIndicatorsData, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedIndicatorsData, (state, { data }) =>
    indicatorDataAdapter.addOne(data, { ...state, ...loadedBaseState })
  ),
  on(loadingDataByIndicatorsFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  })),
  on(resetIndicatorDataLoadedState, state => ({
    ...state,
    ...loadingBaseState
  }))
);

export function indicatorDataReducer(state, action) {
  return reducer(state, action);
}
