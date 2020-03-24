import { createAction, props } from '@ngrx/store';

export const loadAnalyticsData = createAction(
  '[Analytics data] load analytics data',
  props<{ dimensions: Array<any> }>()
);

export const addLoadedAnalyticsData = createAction(
  '[Analytics data] add loaded analytics data',
  props<{ data: any }>()
);

export const loadingAnalyticsDataFail = createAction(
  '[Analytics data] loading analytics data fail',
  props<{ error: any }>()
);
