import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface DataEntryFlowState extends BaseState {
  dataEntryFlowConfigs: any;
}

export const initialDataEntryFlowState = {
  ...initialBaseState,
  dataEntryFlowConfigs: null
};
