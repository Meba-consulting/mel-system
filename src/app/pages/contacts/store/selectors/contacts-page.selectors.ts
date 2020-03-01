import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { ContactsPageDesignState } from '../states/contacts-page.states';

export const getContactsPageDesignState: MemoizedSelector<
  object,
  ContactsPageDesignState
> = createFeatureSelector<ContactsPageDesignState>('contactsPageDesign');

export const getContactsPageDesign = createSelector(
  getContactsPageDesignState,
  (state: ContactsPageDesignState) => state.htmlCode
);

export const getContactsPageLoadingState = createSelector(
  getContactsPageDesignState,
  (state: ContactsPageDesignState) => state.loading
);
