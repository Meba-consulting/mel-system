import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface ContactsPageDesignState extends BaseState {
  htmlCode: any;
}

export const initialContactsPageDesignState = {
  htmlCode: null,
  ...initialBaseState
};
