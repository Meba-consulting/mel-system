import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { DashboardVisualization } from '../../dashboard/models';
import { DashboardSettings } from '../../dashboard/models/dashboard-settings.model';
import {
  getStandardizedVisualizationObject,
  getStandardizedVisualizationUiConfig
} from '../../dashboard/modules/ngx-dhis2-visualization/helpers';
import { VisualizationLayer } from '../../dashboard/modules/ngx-dhis2-visualization/models';
import {
  AddVisualizationObjectAction,
  AddVisualizationUiConfigurationAction,
  LoadVisualizationAnalyticsAction,
  RemoveVisualizationFavoriteAction,
  RemoveVisualizationObjectAction,
  SaveVisualizationFavoriteSuccessAction,
  VisualizationObjectActionTypes
} from '../../dashboard/modules/ngx-dhis2-visualization/store/actions';
import { getCurrentVisualizationObjectLayers } from '../../dashboard/modules/ngx-dhis2-visualization/store/selectors';
import { getActiveDashboardId } from '../../helpers';
import { generateUid } from '../../helpers/generate-uid.helper';
import { User } from '../../models';
import { DashboardService } from '../../services';
import {
  AddDashboardVisualizationAction,
  AddDashboardVisualizationItemAction,
  Go,
  LoadDashboardVisualizationsAction,
  RemoveDashboardVisualizationItemAction
} from '../actions';
import {
  AddDashboardAction,
  AddNewUnsavedFavoriteAction,
  CreateDashboardAction,
  DashboardActionTypes,
  GlobalFilterChangeAction,
  LoadDashboardsAction,
  LoadDashboardsFailAction,
  LoadDashboardsSuccessAction,
  ManageDashboardItemAction,
  ManageDashboardItemFailAction,
  ManageDashboardItemSuccessAction,
  SetCurrentDashboardAction,
  SetCurrentVisualizationAction,
  ToggleDashboardBookmarkAction,
  ToggleDashboardBookmarkFailAction,
  ToggleDashboardBookmarkSuccessAction,
  UpdateDashboardAction
} from '../actions/dashboard.actions';
import { State } from '../reducers';
import {
  getCurrentDashboardVisualizationItems,
  getCurrentUser,
  getDashboardVisualizationById,
  getRouteUrl
} from '../selectors';
import { getDashboardSettings } from '../selectors/dashboard-settings.selectors';

// ngrx store
// Services import
// store actions import
// helpers import
@Injectable()
export class DashboardEffects {
  @Effect()
  loadAllDashboards$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.LoadDashboards),
    withLatestFrom(this.store.select(getRouteUrl)),
    switchMap(([action, routeUrl]: [LoadDashboardsAction, string]) =>
      this.dashboardService.loadAll(action.dashboardSettings).pipe(
        map(
          (dashboards: any[]) =>
            new LoadDashboardsSuccessAction(
              dashboards,
              action.currentUser,
              routeUrl,
              action.systemInfo
            )
        ),
        catchError((error: any) => of(new LoadDashboardsFailAction(error)))
      )
    )
  );

  @Effect()
  loadAllDashboardSuccess$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.LoadDashboardsSuccess),
    map((action: LoadDashboardsSuccessAction) => {
      const currentDashboardId = getActiveDashboardId(
        action.routeUrl,
        action.dashboards,
        action.currentUser
      );
      return new SetCurrentDashboardAction(currentDashboardId, action.routeUrl);
    })
  );

  @Effect({ dispatch: false })
  setCurrentDashboard$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.SetCurrentDashboard),
    withLatestFrom(this.store.select(getCurrentUser)),
    tap(([action, currentUser]: [SetCurrentDashboardAction, User]) => {
      // Set selected dashboard id into local storage
      localStorage.setItem(
        'dhis2.dashboard.current.' + currentUser.userCredentials.username,
        action.id
      );

      // Decide on the route to take
      const splitedRouteUrl = action.routeUrl ? action.routeUrl.split('/') : [];
      const currentVisualizationId = splitedRouteUrl[4];

      if (!currentVisualizationId) {
        this.store.dispatch(new Go({ path: [`/dashboards/${action.id}`] }));
      } else {
        this.store.dispatch(
          new SetCurrentVisualizationAction(currentVisualizationId, action.id)
        );
      }

      // Load current dashboard contents if not available
      this.store
        .select(getDashboardVisualizationById(action.id))
        .pipe(take(1))
        .subscribe((dashboardVisualization: DashboardVisualization) => {
          if (!dashboardVisualization) {
            this.store.dispatch(
              new LoadDashboardVisualizationsAction(
                action.id,
                currentVisualizationId
              )
            );
          }
        });
    })
  );

  @Effect()
  setCurrentVisualization$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.SetCurrentVisualization),
    map(
      (action: SetCurrentVisualizationAction) =>
        new Go({
          path: [
            `/dashboards/${action.dashboardId}/fullScreen/${
              action.visualizationId
            }`
          ]
        })
    )
  );

  @Effect()
  toggleDashboardBookmark$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.ToggleDashboardBookmark),
    withLatestFrom(this.store.select(getCurrentUser)),
    switchMap(([action, currentUser]: [ToggleDashboardBookmarkAction, User]) =>
      this.dashboardService
        .bookmarkDashboard(
          action.id,
          action.changes.bookmarked,
          action.supportBookmark,
          currentUser.id
        )
        .pipe(
          map(
            () =>
              new ToggleDashboardBookmarkSuccessAction(action.id, {
                bookmarkPending: false
              })
          ),
          catchError(error =>
            of(
              new ToggleDashboardBookmarkFailAction(
                action.id,
                {
                  bookmarkPending: false,
                  bookmarked: !action.changes.bookmarked
                },
                error
              )
            )
          )
        )
    )
  );

  @Effect({ dispatch: false })
  addDashboardItem$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.ManageDashboardItem),
    withLatestFrom(this.store.select(getDashboardSettings)),
    tap(
      ([action, dashboardSettings]: [
        ManageDashboardItemAction,
        DashboardSettings
      ]) => {
        this.dashboardService
          .manageDashboardItem(
            action.dashboardId,
            action.dashboardItem,
            dashboardSettings,
            action.action
          )
          .subscribe(
            (dashboardResponse: any) => {
              this.store.dispatch(
                new ManageDashboardItemSuccessAction(
                  dashboardResponse.dashboardId,
                  dashboardResponse.dashboardItem
                )
              );

              if (!action.skipStoreUpdate) {
                if (action.action === 'ADD') {
                  this.store.dispatch(
                    new AddDashboardVisualizationItemAction(
                      dashboardResponse.dashboardId,
                      dashboardResponse.dashboardItem
                        ? dashboardResponse.dashboardItem.id
                        : ''
                    )
                  );

                  this.store.dispatch(
                    new AddVisualizationObjectAction(
                      getStandardizedVisualizationObject({
                        ...dashboardResponse.dashboardItem,
                        dashboardId: dashboardResponse.dashboardId,
                        isOpen: true
                      })
                    )
                  );

                  this.store.dispatch(
                    new AddVisualizationUiConfigurationAction(
                      getStandardizedVisualizationUiConfig({
                        ...dashboardResponse.dashboardItem,
                        dashboardId: dashboardResponse.dashboardId,
                        isOpen: true
                      })
                    )
                  );
                } else if (action.action === 'DELETE') {
                  if (
                    !action.dashboardItem.isNew &&
                    action.dashboardItem.deleteFavorite
                  ) {
                    this.store.dispatch(
                      new RemoveVisualizationFavoriteAction(
                        action.dashboardItem.id,
                        action.dashboardItem.favorite.id,
                        action.dashboardItem.favorite.type
                      )
                    );
                  }
                  this.store.dispatch(
                    new RemoveDashboardVisualizationItemAction(
                      action.dashboardId,
                      action.dashboardItem.id
                    )
                  );

                  this.store.dispatch(
                    new RemoveVisualizationObjectAction(action.dashboardItem.id)
                  );
                }
              }
            },
            error => {
              this.store.dispatch(new ManageDashboardItemFailAction('', error));
            }
          );
      }
    )
  );

  @Effect()
  createDashboard$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.CreateDashboard),
    withLatestFrom(this.store.select(getDashboardSettings)),
    mergeMap(
      ([action, dashboardSettings]: [
        CreateDashboardAction,
        DashboardSettings
      ]) => {
        const id = generateUid();
        this.store.dispatch(
          new AddDashboardAction({
            id,
            name: action.dashboardName,
            creating: true
          })
        );
        return this.dashboardService
          .create({ id, name: action.dashboardName }, dashboardSettings)
          .pipe(
            switchMap(() => [
              new UpdateDashboardAction(id, {
                creating: false,
                updatedOrCreated: true,
                access: {
                  manage: true,
                  write: true,
                  update: true,
                  read: true,
                  externalize: true,
                  delete: true
                }
              }),
              new AddDashboardVisualizationAction({
                id,
                loaded: true,
                loading: false,
                hasError: false,
                error: null,
                items: []
              }),
              new SetCurrentDashboardAction(id)
            ]),
            catchError(error =>
              of(
                new UpdateDashboardAction(id, {
                  creating: false,
                  updatedOrCreated: false,
                  error
                })
              )
            )
          );
      }
    )
  );

  @Effect()
  addNewFavorite$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.AddNewUnsavedFavorite),
    map(
      (action: AddNewUnsavedFavoriteAction) =>
        new AddDashboardVisualizationItemAction(action.id, generateUid())
    )
  );

  @Effect({ dispatch: false })
  globalFilterChange$: Observable<any> = this.actions$.pipe(
    ofType(DashboardActionTypes.GlobalFilterChange),
    withLatestFrom(this.store.select(getCurrentDashboardVisualizationItems)),
    tap(
      ([action, dashboardVisualizations]: [GlobalFilterChangeAction, any[]]) =>
        from(dashboardVisualizations)
          .pipe(
            mergeMap(dashboardVisualization =>
              this.store
                .select(
                  getCurrentVisualizationObjectLayers(dashboardVisualization.id)
                )
                .pipe(
                  take(1),
                  map((visualizationLayers: VisualizationLayer[]) => {
                    return {
                      visualizationId: dashboardVisualization.id,
                      visualizationLayers
                    };
                  })
                )
            )
          )
          .subscribe(
            (visualizationDetails: {
              visualizationId: string;
              visualizationLayers: VisualizationLayer[];
            }) => {
              this.store.dispatch(
                new LoadVisualizationAnalyticsAction(
                  visualizationDetails.visualizationId,
                  visualizationDetails.visualizationLayers,
                  action.changes.globalSelections
                )
              );
            }
          )
    )
  );

  @Effect()
  saveVisualizationFavoriteSuccess$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationObjectActionTypes.SaveVisualizationFavoriteSuccess),
    map(
      (action: SaveVisualizationFavoriteSuccessAction) =>
        new ManageDashboardItemAction(
          action.dashboardId,
          {
            id: action.visualizationId,
            type: action.favoriteType,
            [_.camelCase(action.favoriteType)]: {
              id: action.favoriteDetails.id,
              displayName: action.favoriteDetails.name
            }
          },
          action.action,
          true
        )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private dashboardService: DashboardService
  ) {}
}
