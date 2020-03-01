import { createReducer, on } from '@ngrx/store';
import { initialDataEntryFlowState } from '../states/data-entry-flow.states';
import {
  loadDataEntryFlow,
  addLoadedDataEntryFlow,
  loadingDataEntryFlowFails
} from '../actions';
import {
  loadingBaseState,
  errorBaseState,
  loadedBaseState
} from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialDataEntryFlowState,
  on(loadDataEntryFlow, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedDataEntryFlow, (state, { dataEntryFlowConfigs }) => ({
    ...state,
    dataEntryFlowConfigs,
    ...loadedBaseState
  })),
  on(loadingDataEntryFlowFails, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  }))
);

export function dataEntryFlowReducer(state, action) {
  return reducer(state, action);
}
