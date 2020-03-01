import { createReducer, on } from '@ngrx/store';
import {
  initialReportsListState,
  reportsListAdapter
} from '../states/reports-list.states';
import {
  loadReportsList,
  addLoadedReportsList,
  loadingReportsListFail,
  loadReportsConfigurationsById,
  addLoadedReportConfiguration
} from '../actions/reports-list.actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialReportsListState,
  on(loadReportsList, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedReportsList, (state, { reportsList }) => ({
    ...state,
    ...loadedBaseState,
    reportsList
  })),
  on(loadingReportsListFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  })),
  on(loadReportsConfigurationsById, state => ({
    ...state
  })),
  on(addLoadedReportConfiguration, (state, { report }) =>
    reportsListAdapter.addOne(report, { ...state, ...loadedBaseState })
  )
);

export function reportsListReducer(state, action) {
  return reducer(state, action);
}
