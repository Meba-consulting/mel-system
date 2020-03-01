import { createAction, props } from '@ngrx/store';

export const loadReportsList = createAction('[Reports list] load reports list');

export const loadReportsConfigurationsById = createAction(
  '[Report ] load report by id',
  props<{ reportId: string }>()
);

export const addLoadedReportsList = createAction(
  '[Reports list] add loaded reports list',
  props<{ reportsList }>()
);

export const loadingReportsListFail = createAction(
  '[Reports list] loading reports list fail',
  props<{ error: any }>()
);

export const addLoadedReportConfiguration = createAction(
  '[Reports] add loaded report',
  props<{ report: any }>()
);
