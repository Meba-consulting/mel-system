import { createAction, props } from '@ngrx/store';

export const loadStdReportConfigsById = createAction(
  '[Standard report] load report',
  props<{ reportId: string }>()
);

export const addLoadedStdReportConfigs = createAction(
  '[Standard report] add loaded report',
  props<{ reportConfigs: any }>()
);

export const loadingStdReportConfigsFail = createAction(
  '[Standard report] loading standard report configs fail',
  props<{ error: any }>()
);
