import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface HomePageDesignState extends BaseState {
  htmlCode: any;
}

export const initialHomePageDesignState = {
  htmlCode: null,
  ...initialBaseState
};
