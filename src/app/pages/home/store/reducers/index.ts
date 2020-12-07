import { StoreModule } from '@ngrx/store';
import { homePageReducer } from './home-page.reducer';

export const reducers: any[] = [
  StoreModule.forFeature('homePageDesign', homePageReducer)
];
