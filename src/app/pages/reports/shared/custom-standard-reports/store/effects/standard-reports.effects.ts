import { Injectable } from '@angular/core';
import { StandardReportsService } from '../../services/standard-reports.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadStdReportConfigsById,
  addLoadedStdReportConfigs,
  loadingStdReportConfigsFail
} from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StandardReportsEffects {
  reportsConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStdReportConfigsById),
      switchMap(action =>
        this.standardReportService
          .loadStandardReportsConfigs(action.reportId)
          .pipe(
            map(reportConfigs => addLoadedStdReportConfigs({ reportConfigs })),
            catchError(error => of(loadingStdReportConfigsFail({ error })))
          )
      )
    )
  );
  constructor(
    private standardReportService: StandardReportsService,
    private actions$: Actions
  ) {}
}
