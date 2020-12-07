import { createReducer, on } from '@ngrx/store';
import {
  initialDataEntryFlowState,
  dataEntryFlowAdapter
} from '../states/data-entry-flow.states';
import {
  loadDataEntryFlow,
  addLoadedDataEntryFlow,
  loadingDataEntryFlowFails,
  loadProgramDataEntryFlowConfigs,
  addLoadedProgramDataEntryFlowConfigs
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
  })),
  on(loadProgramDataEntryFlowConfigs, state => ({
    ...state
  })),
  on(addLoadedProgramDataEntryFlowConfigs, (state, { entryFlow }) =>
    dataEntryFlowAdapter.addOne(entryFlow, { ...state })
  )
);

export function dataEntryFlowReducer(state, action) {
  return reducer(state, action);
}
