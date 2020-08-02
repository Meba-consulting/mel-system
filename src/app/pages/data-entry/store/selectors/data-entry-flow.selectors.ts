import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  DataEntryFlowState,
  dataEntryFlowAdapter
} from '../states/data-entry-flow.states';

export const getDataEntryFlowState: MemoizedSelector<
  object,
  DataEntryFlowState
> = createFeatureSelector<DataEntryFlowState>('dataEntryFlowConfigs');

export const {
  selectAll: getAllProgramDataEntryFlowConfigs,
  selectEntities: getProgramDataEntryFlowConfigsEntities
} = dataEntryFlowAdapter.getSelectors(getDataEntryFlowState);

export const getDataEntryFlowConfigs = createSelector(
  getDataEntryFlowState,
  (state: DataEntryFlowState) => state.dataEntryFlowConfigs
);

export const getCurrentProgramDataEntryFlowConfigs = createSelector(
  getProgramDataEntryFlowConfigsEntities,
  (entities, props) => entities[props.id]
);
