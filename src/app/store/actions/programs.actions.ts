import { createAction, props } from '@ngrx/store';

export const loadPrograms = createAction('[Programs] load programs');

export const addLoadedPrograms = createAction(
  '[Programs] add loaded programs',
  props<{ programs: any[] }>()
);

export const loadingProgramsFail = createAction(
  '[Programs] loading programs fails',
  props<{ error: any }>()
);
