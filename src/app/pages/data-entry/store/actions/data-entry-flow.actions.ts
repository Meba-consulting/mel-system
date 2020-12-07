import { createAction, props } from '@ngrx/store';

export const loadDataEntryFlow = createAction(
  '[Data entry flow] load data entry flow'
);

export const addLoadedDataEntryFlow = createAction(
  '[Data entry flow] add loaded data entry flow',
  props<{ dataEntryFlowConfigs: any }>()
);

export const loadingDataEntryFlowFails = createAction(
  '[Data entry flow] loading data entry flow fails',
  props<{ error: any }>()
);

export const loadProgramDataEntryFlowConfigs = createAction(
  '[Data entry flow] load program data entry flow',
  props<{ id: string }>()
);

export const addLoadedProgramDataEntryFlowConfigs = createAction(
  '[Data entry flow] add loaded program configs',
  props<{ entryFlow: any }>()
);

export const loadingProgramDataEntryFlowConfigsFails = createAction(
  '[Data entry flow] loading program data entry configs fails',
  props<{ error: any }>()
);
