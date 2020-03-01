import { StoreModule } from '@ngrx/store';
import { contactsPageReducer } from './contacts-page.reducer';

export const reducers: any[] = [
  StoreModule.forFeature('contactsPageDesign', contactsPageReducer)
];
