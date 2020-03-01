import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReportsService } from '../../services/reports.service';
import {
  loadIndicatorsData,
  addLoadedIndicatorsData,
  loadingDataByIndicatorsFail
} from '../actions/indicators-data.actions';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable()
export class IndicatorDataEffects {
  constructor(
    private actions$: Actions,
    private reportService: ReportsService
  ) {}

  indicatorData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIndicatorsData),
      switchMap(action =>
        from(action.dimensions).pipe(
          mergeMap(dimension =>
            this.reportService.loadIndicatorData(dimension).pipe(
              map(data =>
                addLoadedIndicatorsData({
                  data: {
                    id:
                      dimension['reportId'] +
                      '-' +
                      dimension['ou'] +
                      '-' +
                      dimension['pe'].join('-'),
                    data: data
                  }
                })
              ),
              catchError(error => of(loadingDataByIndicatorsFail({ error })))
            )
          )
        )
      )
    )
  );
}
