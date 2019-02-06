import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  filter as _filter,
  flatten as _flatten,
  map as _map,
  some as _some,
  sortBy as _sortBy
} from 'lodash';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import {
  InitializeDashboardGroupsAction,
  InitializeDashboardGroupsActionSuccess,
  SetActiveDashboardGroupsAction,
  SetActiveDashboardGroupsActionFail,
  DashboardGroupsActionTypes,
  DashboardGroupsActions
} from '../actions/dashboard-groups.action';
import {
  getCurrentDashboardId,
  getRouteUrl,
  getCurrentUser
} from '../selectors';
import { SetCurrentDashboardAction } from '../actions/dashboard.actions';
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  tap
} from 'rxjs/operators';
import { DashboardGroupService } from 'src/app/services/dashboard-group.service';
import { User } from 'src/app/models';
import { getActiveDashboardId } from 'src/app/helpers';

@Injectable()
export class DashboardGroupsEffects {
  @Effect({ dispatch: false })
  setCurrentDashboardGroup$: Observable<any> = this.actions$.pipe(
    ofType<SetActiveDashboardGroupsAction>(
      DashboardGroupsActionTypes.SetActiveDashboardGroup
    ),
    withLatestFrom(this.store.select(getCurrentDashboardId)),
    tap(([action, dashboardId]: [SetActiveDashboardGroupsAction, string]) => {
      const currentDashboardId =
        action.currentDashboardId ||
        (action.activeGroup.dashboards.includes(dashboardId)
          ? dashboardId
          : action.activeGroup.dashboards[0]);
      if (currentDashboardId) {
        this.store.dispatch(new SetCurrentDashboardAction(currentDashboardId));
      }
    })
  );

  @Effect()
  initializeDashboardGroupSuccess$: Observable<
    DashboardGroupsActions
  > = this.actions$.pipe(
    ofType<InitializeDashboardGroupsActionSuccess>(
      DashboardGroupsActionTypes.InitializeDashboardGroupSuccess
    ),
    map(
      (action: InitializeDashboardGroupsActionSuccess) =>
        new SetActiveDashboardGroupsAction(
          action.activeGroup,
          action.currentDashboardId
        )
    )
  );

  @Effect()
  initializeDashboardGroups$: Observable<
    DashboardGroupsActions
  > = this.actions$.pipe(
    ofType<InitializeDashboardGroupsAction>(
      DashboardGroupsActionTypes.InitializeDashboardGroups
    ),
    withLatestFrom(
      this.store.select(getRouteUrl),
      this.store.select(getCurrentUser)
    ),
    switchMap(
      ([action, routeUrl, currentUser]: [
        InitializeDashboardGroupsAction,
        string,
        User
      ]) =>
        this.dashboardGroupService.loadAll(action.dashboardSettings).pipe(
          map(dashboardGroups => {
            const currentDashboardId = getActiveDashboardId(
              routeUrl,
              _flatten(
                _map(dashboardGroups || [], (dashboardGroup: any) => {
                  return _map(dashboardGroup.dashboards || [], dashboardId => {
                    return { id: dashboardId };
                  });
                })
              ),
              currentUser
            );

            const activeDashboardGroup =
              _filter(dashboardGroups || [], (dashboardGroup: any) => {
                return _some(
                  dashboardGroup.dashboards || [],
                  dashboardId => dashboardId === currentDashboardId
                );
              })[0] || _sortBy(dashboardGroups || [], 'sortOrder')[0];

            return new InitializeDashboardGroupsActionSuccess(
              dashboardGroups || [],
              activeDashboardGroup,
              currentDashboardId
            );
          })
        )
    ),
    catchError(error => of(new SetActiveDashboardGroupsActionFail(error)))
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardGroupService: DashboardGroupService
  ) {}
}
