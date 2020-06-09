import { BaseState, initialBaseState } from './base.state';

export interface UserState extends BaseState {
  currentUser: any;
  users: any;
  currentUserGroupOnResources: any;
}

export const initialUserState: UserState = {
  ...initialBaseState,
  currentUser: null,
  users: null,
  currentUserGroupOnResources: []
};
