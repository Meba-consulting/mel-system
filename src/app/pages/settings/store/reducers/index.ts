import { StoreModule } from '@ngrx/store';
import { datastoreReducer } from './datastore.reducer';
import { programsReducer } from './settings.reducer';

export const settingsReducers: any[] = [
  StoreModule.forFeature('programs', programsReducer),
  StoreModule.forFeature('datastore', datastoreReducer),
];
