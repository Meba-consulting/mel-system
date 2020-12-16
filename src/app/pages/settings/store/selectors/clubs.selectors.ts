import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { clubsAdapter, clubsState } from '../states/clubs.states';

const getClubsState: MemoizedSelector<
  Object,
  clubsState
> = createFeatureSelector<clubsState>('clubs');

export const {
  selectAll: getAllClubs,
  selectEntities: getClubsEntities,
} = clubsAdapter.getSelectors(getClubsState);

export const getClubsSavingState = createSelector(
  getClubsState,
  (state: clubsState) => state.savingClub
);
