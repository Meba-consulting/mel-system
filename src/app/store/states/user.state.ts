import { BaseState, initialBaseState } from './base.state';
import { User } from '@iapps/ngx-dhis2-http-client';

export interface UserState extends BaseState {
  currentUser: any;
  users: any;
}

export const initialUserState: UserState = {
  ...initialBaseState,
  currentUser: null,
  users: null
};
