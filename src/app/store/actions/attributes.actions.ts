import { createAction, props } from '@ngrx/store';

export const loadAttributes = createAction('[Attributes] load attributes');

export const addLoadedAttributes = createAction(
  '[Attributes] add loaded attributes',
  props<{ attributes: any }>()
);

export const loadingAttributesFails = createAction(
  '[Attributes] loading attributes fails',
  props<{ error: any }>()
);
