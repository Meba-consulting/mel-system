import { Injectable } from '@angular/core';
import { AnalyticsDataService } from '../../services/analytics-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadAnalyticsData,
  addLoadedAnalyticsData,
  loadingAnalyticsDataFail
} from '../actions';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable()
export class AnalyticsDataEffects {
  analyticsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAnalyticsData),
      switchMap(action =>
        from(action.dimensions).pipe(
          mergeMap(dimension =>
            this.analyticsService.loadIndicatorData(dimension).pipe(
              map(analyticsData =>
                addLoadedAnalyticsData({
                  data: {
                    id:
                      dimension.dx +
                      '-' +
                      dimension.ou.join('-') +
                      '-' +
                      dimension.pe,
                    data: analyticsData
                  }
                })
              ),
              catchError(error => of(loadingAnalyticsDataFail({ error })))
            )
          )
        )
      )
    )
  );
  constructor(
    private analyticsService: AnalyticsDataService,
    private actions$: Actions
  ) {}
}
