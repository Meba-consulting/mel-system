import { StoreModule } from '@ngrx/store';
import { dataEntryFormsReducer } from './data-entry-forms.reducer';

export const reducers: any[] = [
  StoreModule.forFeature('forms', dataEntryFormsReducer)
];
