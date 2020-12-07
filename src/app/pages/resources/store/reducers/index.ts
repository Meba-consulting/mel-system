import { StoreModule } from '@ngrx/store';
import { resourcesReducer } from './resources.reducer';

export const reducers: any[] = [
  StoreModule.forFeature('resources', resourcesReducer)
];
