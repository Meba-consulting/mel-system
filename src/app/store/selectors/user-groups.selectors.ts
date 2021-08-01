import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { userGroupsAdapter } from '../states/user-groups.states';

export const getUserGroupsState = createSelector(
  getRootState,
  (state: State) => state.userGroups
);

export const {
  selectAll: getAllUserGroups,
  selectEntities: getUserGroupsEntities,
} = userGroupsAdapter.getSelectors(getUserGroupsState);

export const getUserGroupById = createSelector(
  getAllUserGroups,
  (userGroups, props) => {
    return (userGroups.filter((userGroup) => userGroup?.id === props['id']) ||
      [])[0];
  }
);
