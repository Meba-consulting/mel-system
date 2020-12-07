import { createSelector, props } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { selectAllUsers, getSystemUsers } from '../reducers/user.reducer';
import { User } from 'src/app/pages/dashboard/pages/models';
import * as _ from 'lodash';

export const getUserState = createSelector(
  getRootState,
  (state: State) => state.user
);

export const getAllUser = createSelector(getUserState, selectAllUsers);

export const getAllSystemUsers = createSelector(getUserState, getSystemUsers);

export const getCurrentUser = createSelector(
  getAllUser,
  (users: User[]) => users[0]
);

export const getLoadedUserGroupsEntities = createSelector(
  getUserState,
  (state: any) =>
    state.currentUserGroupOnResources.reduce(
      (userGroups, userGroup) => ({
        ...userGroups,
        [userGroup.id]: userGroup
      }),
      {}
    )
);

export const getCurrentUserGroupById = createSelector(
  getUserState,
  (state, props) =>
    _.filter(state.currentUserGroupOnResources, { id: props.id })
);
