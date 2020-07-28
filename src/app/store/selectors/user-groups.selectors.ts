import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { userGroupsAdapter } from '../states/user-groups.states';

export const getUserGroupsState = createSelector(
  getRootState,
  (state: State) => state.userGroups
);

export const {
  selectAll: getAllUserGroups,
  selectEntities: getUserGroupsEntities
} = userGroupsAdapter.getSelectors(getUserGroupsState);
