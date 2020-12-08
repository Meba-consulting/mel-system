import { createAction, props } from '@ngrx/store';

export const createConfigsOnDataStore = createAction(
  '[Datastore] add configs',
  props<{ configs: any }>()
);

export const addCreatedConfigs = createAction(
  '[Datastore] add created configs',
  props<{ configs: any }>()
);

export const creatingConfigsFails = createAction(
  '[Datastore] creating configs fails',
  props<{ error: any }>()
);

export const loadDatastoreConfigs = createAction(
  '[Datastore] load configs from datastore',
  props<{ id: string }>()
);

export const addLoadedConfigs = createAction(
  '[Datastore] add loaded configs',
  props<{ configs: any }>()
);

export const loadingConfigsFails = createAction(
  '[Datastore] loading configs fails',
  props<{ error: any }>()
);
