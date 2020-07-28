import { createReducer, on } from '@ngrx/store';
import {
  initialUserGroupsState,
  userGroupsAdapter
} from '../states/user-groups.states';
import {
  loadUserGroups,
  addLoadedUserGroups,
  loadingUserGroupsFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from '../states/base.state';

const reducer = createReducer(
  initialUserGroupsState,
  on(loadUserGroups, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedUserGroups, (state, { userGroups }) =>
    userGroupsAdapter.addMany(userGroups, { ...state, ...loadedBaseState })
  ),
  on(loadingUserGroupsFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
    ...loadedBaseState
  }))
);

export function userGroupsReducer(state, action) {
  return reducer(state, action);
}
