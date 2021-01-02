import { createReducer, on } from '@ngrx/store';
import {
  addSavedClub,
  creatingClubFails,
  editClub,
  saveClub,
  setCurrentClub,
  updateClub,
} from '../actions';
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
  })),
  on(setCurrentClub, (state, { currentClub }) => ({
    ...state,
    currentClub,
  })),
  on(editClub, (state) => ({
    ...state,
    editingClub: true,
    savedClub: false,
  })),
  on(updateClub, (state, { id, club }) =>
    clubsAdapter.updateOne(
      { id: id, changes: club },
      { ...state, editingClub: false, savedClub: true }
    )
  )
);

export function clubsReducer(state, action) {
  return reducer(state, action);
}
