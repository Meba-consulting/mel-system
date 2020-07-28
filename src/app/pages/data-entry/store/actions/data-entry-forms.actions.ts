import { createAction, props } from '@ngrx/store';

export const loadDataEntryFormsByOu = createAction(
  '[Data entry forms] load data entry form by ou',
  props<{ orgUnit: string }>()
);

export const addSuccessLoadedFormsByOu = createAction(
  '[Data entry forms] add loaded forms by ou',
  props<{ forms: any }>()
);

export const loadingFormsByOuFails = createAction(
  '[Data entry forms] loaing forms fails by ou',
  props<{ error: any }>()
);

export const loadProgramMetadata = createAction(
  '[Program] load program',
  props<{ programId: string }>()
);

export const addLoadedProgramMetadata = createAction(
  '[Program] add loaded program',
  props<{ programMetadata: Array<any> }>()
);

export const loadingProgramMetadataFails = createAction(
  '[Program] loaing program fails',
  props<{ error: any }>()
);
