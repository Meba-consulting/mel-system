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

export const setCurrentClub = createAction(
  '[Clubs] set current club',
  props<{ currentClub: any }>()
);

export const editClub = createAction(
  '[Clubs] edit club',
  props<{ club: any; id: string }>()
);

export const updateClub = createAction(
  '[Clubs] update club',
  props<{ id: string; club: any }>()
);
