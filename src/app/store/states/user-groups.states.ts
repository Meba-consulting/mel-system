import { BaseState, initialBaseState } from './base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface UserGroupsState extends BaseState, EntityState<any> {}

export const userGroupsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialUserGroupsState = userGroupsAdapter.getInitialState({
  ...initialBaseState
});
