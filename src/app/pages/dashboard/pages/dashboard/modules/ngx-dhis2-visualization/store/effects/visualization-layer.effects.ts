import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, zip, of } from 'rxjs';
import {
  filter,
  switchMap,
  take,
  tap,
  concatMap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  getFunctionLoadedStatus,
  getFunctions,
} from '../../../ngx-dhis2-data-selection-filter/modules/data-filter/store/selectors/function.selectors';
import {
  getMergedDataSelections,
  getSanitizedAnalytics,
  getStandardizedAnalyticsObject,
} from '../../helpers';
import { VisualizationDataSelection, VisualizationLayer } from '../../models';
import { AnalyticsService } from '../../services/analytics.service';
import {
  LoadVisualizationAnalyticsAction,
  LoadVisualizationAnalyticsSuccessAction,
  UpdateVisualizationLayerAction,
  VisualizationLayerActionTypes,
} from '../actions/visualization-layer.actions';
import { UpdateVisualizationObjectAction } from '../actions/visualization-object.actions';
import { VisualizationState } from '../reducers';
import { getCombinedVisualizationObjectById } from '../selectors';
// import {
//   OrgUnitLevel,
//   getOrgUnitLevels,
//   getOrgUnitGroups,
//   OrgUnitGroup
// } from '@iapps/ngx-dhis2-org-unit-filter';
import { updateDataSelectionsWithSummaryNames } from '../../helpers/update-data-selections-with-summary-name.helper';
import { NgxDhis2HttpClientService, User } from '@iapps/ngx-dhis2-http-client';
import { getVisualizationLayerSubtitle } from '../../helpers/get-visualization-layer-subtitle.helper';
import { getOrgUnitLevels } from 'src/app/shared/modules/org-unit-filter/store/selectors/org-unit-level.selectors';
import { getOrgUnitGroups } from 'src/app/shared/modules/org-unit-filter/store/selectors/org-unit-group.selectors';
import { OrgUnitLevel } from 'src/app/shared/modules/org-unit-filter/models/org-unit-level.model';
import { OrgUnitGroup } from 'src/app/shared/modules/org-unit-filter/models/org-unit-group.model';

@Injectable()
export class VisualizationLayerEffects {
  @Effect({ dispatch: false })
  loadAnalytics$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationLayerActionTypes.LOAD_VISUALIZATION_ANALYTICS),
    concatMap((action) =>
      of(action).pipe(
        withLatestFrom(
          this.store.pipe(select(getOrgUnitLevels)),
          this.store.pipe(select(getOrgUnitGroups)),
          this.httpClient.me()
        )
      )
    ),
    tap(
      ([action, orgUnitLevels, orgUnitGroups, currentUser]: [
        LoadVisualizationAnalyticsAction,
        OrgUnitLevel[],
        OrgUnitGroup[],
        User
      ]) => {
        this.store
          .select(getCombinedVisualizationObjectById(action.visualizationId))
          .pipe(take(1))
          .subscribe((visualizationObject: any) => {
            if (visualizationObject) {
              const visualizationType = visualizationObject.config
                ? visualizationObject.config.currentType
                : visualizationObject.type;
              if (!visualizationObject.isNonVisualizable) {
                this.store.dispatch(
                  new UpdateVisualizationObjectAction(action.visualizationId, {
                    progress: {
                      statusCode: 200,
                      statusText: 'OK',
                      percent: 50,
                      message: 'Favorite information has been loaded',
                    },
                  })
                );

                const visualizationLayers = action.globalSelections
                  ? _.map(
                      visualizationObject.layers,
                      (visualizationLayer: VisualizationLayer) => {
                        return {
                          ...visualizationLayer,
                          dataSelections: getMergedDataSelections(
                            visualizationLayer.dataSelections,
                            action.globalSelections,
                            visualizationType
                          ),
                        };
                      }
                    )
                  : action.visualizationLayers;

                this.store
                  .select(getFunctionLoadedStatus)
                  .pipe(
                    filter((loaded: boolean) => loaded),
                    switchMap(() => this.store.select(getFunctions)),
                    take(1)
                  )
                  .subscribe((functions: any[]) => {
                    const functionRules = _.flatten(
                      _.map(functions, (functionObject) => functionObject.items)
                    );

                    const newVisualizationLayers: VisualizationLayer[] = _.map(
                      visualizationLayers,
                      (visualizationLayer: VisualizationLayer) => {
                        const dataSelections: VisualizationDataSelection[] = _.map(
                          visualizationLayer.dataSelections,
                          (dataSelection: VisualizationDataSelection) => {
                            switch (dataSelection.dimension) {
                              case 'dx': {
                                return {
                                  ...dataSelection,
                                  items: _.map(
                                    dataSelection.items,
                                    (item: any) => {
                                      if (item.type === 'FUNCTION_RULE') {
                                        const functionRule = _.find(
                                          functionRules,
                                          ['id', item.id]
                                        );
                                        return functionRule
                                          ? { ...functionRule, type: item.type }
                                          : item;
                                      }
                                      return item;
                                    }
                                  ),
                                };
                              }
                              default:
                                return dataSelection;
                            }
                          }
                        );
                        return { ...visualizationLayer, dataSelections };
                      }
                    );

                    zip(
                      ..._.map(
                        newVisualizationLayers,
                        (visualizationLayer: VisualizationLayer) => {
                          return this.analyticsService.getAnalytics(
                            visualizationLayer.dataSelections,
                            visualizationLayer.layerType,
                            { ...visualizationLayer.config, visualizationType }
                          );
                        }
                      )
                    ).subscribe(
                      (analyticsResponse) => {
                        // Save visualizations layers
                        _.each(
                          analyticsResponse,
                          (analytics, analyticsIndex) => {
                            const visualizationLayer: VisualizationLayer =
                              visualizationLayers[analyticsIndex];

                            const dataSelections = updateDataSelectionsWithSummaryNames(
                              visualizationLayer.dataSelections,
                              orgUnitGroups,
                              orgUnitLevels,
                              currentUser,
                              analytics
                            );
                            this.store.dispatch(
                              new LoadVisualizationAnalyticsSuccessAction(
                                visualizationLayer.id,
                                {
                                  analytics: getSanitizedAnalytics(
                                    getStandardizedAnalyticsObject(
                                      analytics,
                                      true
                                    ),
                                    dataSelections
                                  ),
                                  dataSelections,
                                  config: {
                                    ...visualizationLayer.config,
                                    subtitle: getVisualizationLayerSubtitle(
                                      dataSelections
                                    ),
                                  },
                                }
                              )
                            );
                          }
                        );
                        // Update visualization object
                        this.store.dispatch(
                          new UpdateVisualizationObjectAction(
                            action.visualizationId,
                            {
                              progress: {
                                statusCode: 200,
                                statusText: 'OK',
                                percent: 100,
                                message: 'Analytics loaded',
                              },
                            }
                          )
                        );
                      },
                      (error) => {
                        this.store.dispatch(
                          new UpdateVisualizationObjectAction(
                            action.visualizationId,
                            {
                              progress: {
                                statusCode: error.status,
                                statusText: 'Error',
                                percent: 100,
                                message: error.message,
                              },
                            }
                          )
                        );
                      }
                    );
                  });
              } else {
                _.each(
                  _.map(
                    action.visualizationLayers,
                    (visualizationLayer: VisualizationLayer) => {
                      return {
                        ...visualizationLayer,
                        dataSelections: getMergedDataSelections(
                          visualizationLayer.dataSelections,
                          action.globalSelections,
                          visualizationObject.type
                        ),
                      };
                    }
                  ),
                  (visualizationLayer) => {
                    this.store.dispatch(
                      new UpdateVisualizationLayerAction(
                        visualizationLayer.id,
                        visualizationLayer
                      )
                    );
                  }
                );
              }
            } else {
              _.each(action.visualizationLayers, (visualizationLayer) => {
                this.store.dispatch(
                  new UpdateVisualizationLayerAction(
                    visualizationLayer.id,
                    visualizationLayer
                  )
                );
              });
            }
          });
      }
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<VisualizationState>,
    private analyticsService: AnalyticsService,
    private httpClient: NgxDhis2HttpClientService
  ) {}
}
