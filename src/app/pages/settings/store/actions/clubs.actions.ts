import { createAction, props } from '@ngrx/store';

export const saveClub = createAction(
  '[Clubs] save club',
  props<{ clubDetails: any }>()
);

export const addSavedClub = createAction(
  '[Clubs] add saved club',
  props<{ club: any }>()
);

export const creatingClubFails = createAction(
  '[Clubs] creating club fails',
  props<{ error: any }>()
);
