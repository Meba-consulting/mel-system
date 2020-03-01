import { Action, createAction, props } from '@ngrx/store';
import {
  SystemInfo,
  User,
  ErrorMessage
} from 'src/app/pages/dashboard/pages/models';

export enum UserActionTypes {
  LoadCurrentUser = '[User] Load current User',
  AddCurrentUser = '[User] Add Current User',
  LoadCurrentUserFail = '[User] Load Current User fail',
  LoadSystemUsers = '[User] load system users',
  AddSystemUsers = '[User] add system users',
  LoadingSystemUsersFail = '[User] loading system users fail'
}

export class LoadCurrentUser implements Action {
  readonly type = UserActionTypes.LoadCurrentUser;
  constructor(public systemInfo: SystemInfo) {}
}

export class AddCurrentUser implements Action {
  readonly type = UserActionTypes.AddCurrentUser;

  constructor(public currentUser: User, public systemInfo: SystemInfo) {}
}

export class LoadCurrentUserFail implements Action {
  readonly type = UserActionTypes.LoadCurrentUserFail;

  constructor(public error: ErrorMessage) {}
}

export class LoadSystemUsers implements Action {
  readonly type = UserActionTypes.LoadSystemUsers;
}

export class AddSystemUsers implements Action {
  readonly type = UserActionTypes.AddSystemUsers;
  constructor(public users: any) {}
}

export class LoadingSystemUsersFail implements Action {
  readonly type = UserActionTypes.LoadingSystemUsersFail;
  constructor(public error: ErrorMessage) {}
}

export type UserActions =
  | LoadCurrentUser
  | AddCurrentUser
  | LoadCurrentUserFail
  | LoadSystemUsers
  | AddSystemUsers
  | LoadingSystemUsersFail;
