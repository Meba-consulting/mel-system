import { Injectable } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadReportsList,
  addLoadedReportsList,
  loadingReportsListFail,
  loadReportsConfigurationsById,
  addLoadedReportConfiguration
} from '../actions/reports-list.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ReportsListEffects {
  reportsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReportsList),
      switchMap(action =>
        this.reportsService.getReportsList().pipe(
          map(reportsList => addLoadedReportsList({ reportsList })),
          catchError(error => of(loadingReportsListFail({ error })))
        )
      )
    )
  );

  report$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadReportsConfigurationsById),
      switchMap(action =>
        this.reportsService.getReportById(action['reportId']).pipe(
          map(report =>
            addLoadedReportConfiguration({
              report: { id: action['reportId'], configs: report }
            })
          ),
          catchError(error => of(loadingReportsListFail({ error })))
        )
      )
    )
  );
  constructor(
    private reportsService: ReportsService,
    private actions$: Actions
  ) {}
}
