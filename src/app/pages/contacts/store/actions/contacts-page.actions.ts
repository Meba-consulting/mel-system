import { createAction, props } from '@ngrx/store';

export const loadContactsPageDesign = createAction(
  '[Contacts page] load Contacts page design'
);

export const addContactsPageDesign = createAction(
  '[Contacts page] add loaded Contacts page',
  props<{ htmlCode: any }>()
);

export const loadingContactsPageDesignFail = createAction(
  '[Contacts page] loading Contacts page design fail',
  props<{ error: any }>()
);
