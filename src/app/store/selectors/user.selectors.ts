import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { selectAllUsers, getSystemUsers } from '../reducers/user.reducer';
import { User } from 'src/app/pages/dashboard/pages/models';
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
