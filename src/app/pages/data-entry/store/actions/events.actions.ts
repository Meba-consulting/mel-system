import { createAction, props } from '@ngrx/store';

export const loadEvents = createAction(
  '[Events] load events',
  props<{ dataDimenions: Array<any> }>()
);

export const addLoadedEvents = createAction(
  '[Events] add loaded events',
  props<{ events: any }>()
);

export const loadingEventsFails = createAction(
  '[Events] loading events fail',
  props<{ error: any }>()
);

export const loadFileResources = createAction(
  '[Events] load file resources',
  props<{ dimensions: any[]; key: string }>()
);

export const addLoadedFileResource = createAction(
  '[Events] add loaded file resources',
  props<{ file: any }>()
);
