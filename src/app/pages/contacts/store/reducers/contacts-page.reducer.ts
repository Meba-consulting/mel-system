import { createReducer, on } from '@ngrx/store';
import { initialContactsPageDesignState } from '../states/contacts-page.states';
import {
  loadContactsPageDesign,
  addContactsPageDesign,
  loadingContactsPageDesignFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialContactsPageDesignState,
  on(loadContactsPageDesign, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addContactsPageDesign, (state, { htmlCode }) => ({
    ...state,
    ...loadedBaseState,
    htmlCode
  })),
  on(loadingContactsPageDesignFail, (state, { error }) => ({
    ...state,
    error,
    ...loadedBaseState,
    ...errorBaseState
  }))
);

export function contactsPageReducer(state, action) {
  return reducer(state, action);
}
