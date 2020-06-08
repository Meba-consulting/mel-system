import { createAction, props } from '@ngrx/store';

export const loadResources = createAction('[Resources] load resources');

export const addLoadedResources = createAction(
  '[Resources] add loaded resources',
  props<{ resources: any }>()
);

export const loadingResourcesFail = createAction(
  '[Resources] loading resources fail',
  props<{ error: any }>()
);
