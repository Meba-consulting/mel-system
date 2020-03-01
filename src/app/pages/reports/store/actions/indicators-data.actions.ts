import { createAction, props } from '@ngrx/store';

export const loadIndicatorsData = createAction(
  '[Data] load indicators data',
  props<{ dimensions: any }>()
);

export const addLoadedIndicatorsData = createAction(
  '[Data] add loaded data',
  props<{ data: any }>()
);

export const loadingDataByIndicatorsFail = createAction(
  '[Data] loading indicators fail',
  props<{ error: any }>()
);

export const resetIndicatorDataLoadedState = createAction(
  '[Data] reset indicator data loaded state'
);
