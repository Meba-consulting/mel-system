import { createReducer, on } from '@ngrx/store';
import { addSavedClub, creatingClubFails, saveClub } from '../actions';
import { clubsAdapter, initialClubsState } from '../states/clubs.states';

const reducer = createReducer(
  initialClubsState,
  on(saveClub, (state) => ({
    ...state,
    savingClub: true,
    savedClub: false,
  })),
  on(addSavedClub, (state, { club }) =>
    clubsAdapter.addOne(club, { ...state, savingClub: false, savedClub: true })
  ),
  on(creatingClubFails, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function clubsReducer(state, action) {
  return reducer(state, action);
}
