import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface DataEntryFlowState extends BaseState, EntityState<any> {
  dataEntryFlowConfigs: any;
}

export const dataEntryFlowAdapter: EntityAdapter<any> = createEntityAdapter<
  any
>();

export const initialDataEntryFlowState = dataEntryFlowAdapter.getInitialState({
  ...initialBaseState,
  dataEntryFlowConfigs: null
});
