import { createAction, props } from '@ngrx/store';

export const loadStdReportsList = createAction(
  '[Reports list] load reports list',
  props<{ reportsTypes: any[] }>()
);

export const addLoadedStdReportsList = createAction(
  '[Reports list] add loaded reports list',
  props<{ reportsList: Array<any> }>()
);

export const loadingOldStdReportsListFails = createAction(
  '[Reports list] loading reports list fail',
  props<{ error: any }>()
);

export const loadReportMetadata = createAction(
  '[Old Reports] load metadata of the report',
  props<{ reportId: string; reportType: string }>()
);

export const addLoadedReportMetadata = createAction(
  '[Old Reports] add loaded reports metadata',
  props<{ report: any }>()
);

export const loadingReportMetadataFails = createAction(
  '[Old Reports] loading reports metadata fails',
  props<{ error: any }>()
);
