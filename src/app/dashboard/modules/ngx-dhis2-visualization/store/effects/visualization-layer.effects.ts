import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { forkJoin, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import {
  getFunctionLoadedStatus,
  getFunctions
} from '../../../ngx-dhis2-data-selection-filter/modules/data-filter/store/selectors/function.selectors';
import {
  getMergedDataSelections,
  getSanitizedAnalytics,
  getStandardizedAnalyticsObject
} from '../../helpers';
import { VisualizationDataSelection, VisualizationLayer } from '../../models';
import { AnalyticsService } from '../../services/analytics.service';
import {
  LoadVisualizationAnalyticsAction,
  LoadVisualizationAnalyticsSuccessAction,
  UpdateVisualizationLayerAction,
  VisualizationLayerActionTypes
} from '../actions/visualization-layer.actions';
import { UpdateVisualizationObjectAction } from '../actions/visualization-object.actions';
import { VisualizationState } from '../reducers';
import { getCombinedVisualizationObjectById } from '../selectors';

@Injectable()
export class VisualizationLayerEffects {
  @Effect({ dispatch: false })
  loadAnalytics$: Observable<any> = this.actions$.pipe(
    ofType(VisualizationLayerActionTypes.LOAD_VISUALIZATION_ANALYTICS),
    tap((action: LoadVisualizationAnalyticsAction) => {
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
                    message: 'Favorite information has been loaded'
                  }
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
                        )
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
                    _.map(functions, functionObject => functionObject.items)
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
                                )
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

                  forkJoin(
                    _.map(
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
                    analyticsResponse => {
                      // Save visualizations layers
                      _.each(analyticsResponse, (analytics, analyticsIndex) => {
                        this.store.dispatch(
                          new LoadVisualizationAnalyticsSuccessAction(
                            visualizationLayers[analyticsIndex].id,
                            {
                              analytics: getSanitizedAnalytics(
                                getStandardizedAnalyticsObject(analytics, true),
                                visualizationLayers[analyticsIndex]
                                  .dataSelections
                              ),
                              dataSelections:
                                visualizationLayers[analyticsIndex]
                                  .dataSelections
                            }
                          )
                        );
                      });
                      // Update visualization object
                      this.store.dispatch(
                        new UpdateVisualizationObjectAction(
                          action.visualizationId,
                          {
                            progress: {
                              statusCode: 200,
                              statusText: 'OK',
                              percent: 100,
                              message: 'Analytics loaded'
                            }
                          }
                        )
                      );
                    },
                    error => {
                      this.store.dispatch(
                        new UpdateVisualizationObjectAction(
                          action.visualizationId,
                          {
                            progress: {
                              statusCode: error.status,
                              statusText: 'Error',
                              percent: 100,
                              message: error.message
                            }
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
                      )
                    };
                  }
                ),
                visualizationLayer => {
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
            _.each(action.visualizationLayers, visualizationLayer => {
              this.store.dispatch(
                new UpdateVisualizationLayerAction(
                  visualizationLayer.id,
                  visualizationLayer
                )
              );
            });
          }
        });
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<VisualizationState>,
    private analyticsService: AnalyticsService
  ) {}
}
