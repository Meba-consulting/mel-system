import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  tap,
  take,
  switchMap
} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DashboardSettingsService } from '../../services/dashboard-settings.service';

import {
  DashboardSettingsActionTypes,
  AddDashboardSettingsAction,
  LoadDashboardSettingsFailAction,
  LoadDashboardSettingsAction,
  LoadDashboardsAction,
  InitializeDashboardGroupsAction
} from '../actions';

import { State } from '../reducers';

@Injectable()
export class DashboardSettingsEffects {
  @Effect()
  loadDashboardSettings$: Observable<any> = this.actions$.pipe(
    ofType(DashboardSettingsActionTypes.LoadDashboardSettings),
    mergeMap((action: LoadDashboardSettingsAction) =>
      this.dashboardSettingsService.loadAll().pipe(
        map(
          (dashboardSettings: any) =>
            new AddDashboardSettingsAction(
              dashboardSettings,
              action.currentUser,
              action.systemInfo
            )
        ),
        catchError((error: any) =>
          of(new LoadDashboardSettingsFailAction(error, action.currentUser))
        )
      )
    )
  );

  @Effect()
  dashboardSettingsLoaded$: Observable<any> = this.actions$.pipe(
    ofType(DashboardSettingsActionTypes.AddDashboardSettings),
    switchMap((action: AddDashboardSettingsAction) => [
      new LoadDashboardsAction(
        action.currentUser,
        action.dashboardSettings,
        action.systemInfo
      ),
      new InitializeDashboardGroupsAction(action.dashboardSettings)
    ])
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardSettingsService: DashboardSettingsService
  ) {}
}
