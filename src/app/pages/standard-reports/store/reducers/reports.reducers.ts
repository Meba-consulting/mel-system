import { createReducer, on } from '@ngrx/store';
import {
  initialOldReportsState,
  oldReportsAdapter
} from '../states/reports.states';
import {
  loadStdReportsList,
  addLoadedStdReportsList,
  loadingOldStdReportsListFails,
  loadReportMetadata,
  addLoadedReportMetadata,
  loadingReportMetadataFails,
  loadSSBResources,
  addLoadedSSBResources,
  loadingSSBResourcesFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

const reducer = createReducer(
  initialOldReportsState,
  on(loadStdReportsList, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedStdReportsList, (state, { reportsList }) => ({
    ...state,
    reportsList: [...state.reportsList, ...reportsList],
    countOfReportsTypesLoaded: state.countOfReportsTypesLoaded + 1,
    ...loadedBaseState
  })),
  on(loadingOldStdReportsListFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  })),
  on(loadReportMetadata, state => ({
    ...state,
    loadingReportMetadata: true
  })),
  on(addLoadedReportMetadata, (state, { report }) =>
    oldReportsAdapter.addOne(report, { ...state, loadedReportsMetadata: true })
  ),
  on(loadingReportMetadataFails, (state, { error }) => ({
    ...state,
    reportMetadataError: error,
    ...errorBaseState
  })),
  on(loadSSBResources, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedSSBResources, (state, { resources }) => ({
    ...state,
    resources,
    ...loadedBaseState
  })),
  on(loadingSSBResourcesFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  }))
);

export function oldReportsReducer(state, action) {
  return reducer(state, action);
}
