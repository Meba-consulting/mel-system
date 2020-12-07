import { createAction, props } from '@ngrx/store';

export const loadUserGroups = createAction('[User groups] load user groups');

export const addLoadedUserGroups = createAction(
  '[User groups] add loaded user groups',
  props<{ userGroups: any[] }>()
);

export const loadingUserGroupsFail = createAction(
  '[User groups] add loading user groups fails',
  props<{ error: any }>()
);
