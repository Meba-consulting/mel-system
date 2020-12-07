import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface ResourcesState extends BaseState {
  resources: Array<any>;
}

export const initialResourcesState = {
  resources: [],
  ...initialBaseState
};
