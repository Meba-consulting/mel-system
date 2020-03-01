import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { DataEntryFlowState } from '../states/data-entry-flow.states';

export const getDataEntryFlowState: MemoizedSelector<
  object,
  DataEntryFlowState
> = createFeatureSelector<DataEntryFlowState>('dataEntryFlowConfigs');

export const getDataEntryFlowConfigs = createSelector(
  getDataEntryFlowState,
  (state: DataEntryFlowState) => state.dataEntryFlowConfigs
);
