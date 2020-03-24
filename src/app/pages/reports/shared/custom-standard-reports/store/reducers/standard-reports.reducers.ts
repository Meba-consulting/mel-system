import { createReducer, on } from '@ngrx/store';
import {
  initialStandardReportsConfigsState,
  standardReportsConfigsAdapter
} from '../states/standard-reports.states';
import {
  loadStdReportConfigsById,
  addLoadedStdReportConfigs,
  loadingStdReportConfigsFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

const reducer = createReducer(
  initialStandardReportsConfigsState,
  on(loadStdReportConfigsById, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedStdReportConfigs, (state, { reportConfigs }) =>
    standardReportsConfigsAdapter.addOne(reportConfigs, {
      ...state,
      ...loadedBaseState
    })
  ),
  on(loadingStdReportConfigsFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  }))
);

export function standardReportConfigsReducer(state, action) {
  return reducer(state, action);
}
