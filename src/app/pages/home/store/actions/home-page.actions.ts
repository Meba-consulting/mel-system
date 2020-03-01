import { createAction, props } from '@ngrx/store';

export const loadHomePageDesign = createAction(
  '[Home page] load home page design'
);

export const addHomePageDesign = createAction(
  '[Home page] add loaded home page',
  props<{ htmlCode: any }>()
);

export const loadingHomePageDesignFail = createAction(
  '[Home page] loading home page design fail',
  props<{ error: any }>()
);
