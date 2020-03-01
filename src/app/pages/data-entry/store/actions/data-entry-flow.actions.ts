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
