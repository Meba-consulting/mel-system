import { createAction, props } from '@ngrx/store';

export const createProgram = createAction(
  '[Programs] create program',
  props<{ programDetails: any }>()
);

export const addCreatedProgram = createAction(
  '[Programs] add created program',
  props<{ program: any }>()
);

export const creatingProgramFails = createAction(
  '[Programs] creating program fails',
  props<{ error: any }>()
);

export const loadPrograms = createAction('[Programs] load programs');

export const addLoadedPrograms = createAction(
  '[Programs] add loaded programs',
  props<{ programs: any[] }>()
);

export const loadingProgramsFails = createAction(
  '[Programs] loading programs fails',
  props<{ error: any }>()
);
