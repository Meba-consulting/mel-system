import {
  createSelector,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as _ from 'lodash';
import { getCurrentDashboardId } from './dashboard.selectors';
import {
  getDashboardVisualizationEntitiesState,
  DashboardVisualizationState
} from '../reducers/dashboard-visualization.reducer';
import { DashboardVisualization } from '../../dashboard/models';
import {
  getVisualizationObjectEntities,
  getVisualizationLayerEntities
} from '../../dashboard/modules/ngx-dhis2-visualization/store';
import {
  VisualizationLayer,
  VisualizationDataSelection,
  Visualization
} from '../../dashboard/modules/ngx-dhis2-visualization/models';
import { getSelectionDimensionsFromAnalytics } from '../../dashboard/modules/ngx-dhis2-visualization/helpers';

export const getDashboardVisualizationState: MemoizedSelector<
  object,
  any
> = createFeatureSelector<any>('dashboardVisualization');
// export const getDashboardVisualizationState = createSelector(
//   getRootState,
//   (state: State) => state.dashboardVisualization
// );

export const getDashboardVisualizationEntities = createSelector(
  getDashboardVisualizationState,
  getDashboardVisualizationEntitiesState
);

export const getCurrentDashboardVisualization = createSelector(
  getDashboardVisualizationEntities,
  getCurrentDashboardId,
  (dashboardVisualizationEntities, currentDashboardId) =>
    dashboardVisualizationEntities[currentDashboardId]
);

export const getCurrentDashboardVisualizationItems = createSelector(
  getCurrentDashboardVisualization,
  (currentDashboardVisualization: DashboardVisualization) =>
    currentDashboardVisualization ? currentDashboardVisualization.items : []
);

export const getCurrentDashboardVisualizationLoading = createSelector(
  getCurrentDashboardVisualization,
  (currentDashboardVisualization: DashboardVisualization) =>
    currentDashboardVisualization ? currentDashboardVisualization.loading : true
);

export const getCurrentDashboardVisualizationLoaded = createSelector(
  getCurrentDashboardVisualization,
  (currentDashboardVisualization: DashboardVisualization) =>
    currentDashboardVisualization ? currentDashboardVisualization.loaded : false
);

export const getDashboardVisualizationById = id =>
  createSelector(
    getDashboardVisualizationEntities,
    dashboardVisualizationEntities => dashboardVisualizationEntities[id]
  );

export const getVisualizationReady = createSelector(
  getDashboardVisualizationState,
  (state: DashboardVisualizationState) => state.visualizationsReady
);

export const getCurrentGlobalDataSelections = createSelector(
  getCurrentDashboardVisualizationItems,
  getVisualizationObjectEntities,
  getVisualizationLayerEntities,
  (
    dashboardVisualizationItems: any,
    visualizationObjectEntities: any,
    visualizationLayerEntities: any
  ) => {
    const visualizationLayers: VisualizationLayer[] = _.map(
      _.flatten(
        _.map(
          _.flatten(
            _.map(
              dashboardVisualizationItems,
              (dashboardVisualizationItem: any) =>
                visualizationObjectEntities[dashboardVisualizationItem.id]
            )
          ),
          visualization => (visualization ? visualization.layers : [])
        )
      ),
      layerId => visualizationLayerEntities[layerId]
    );

    const globalDataSelectionsArray = _.map(
      visualizationLayers,
      (visualizationLayer: VisualizationLayer) => {
        const selectionDimensions = getSelectionDimensionsFromAnalytics(
          visualizationLayer ? visualizationLayer.analytics : null
        );

        return selectionDimensions.filter(
          (selectionDimension: any) => selectionDimension.dimension !== 'dx'
        );
      }
    );

    let mergedDataSelections = [];

    _.each(
      globalDataSelectionsArray,
      (dataSelections: VisualizationDataSelection[]) => {
        _.each(dataSelections, (dataSelection: VisualizationDataSelection) => {
          const availableDataSelection = _.find(mergedDataSelections, [
            'dimension',
            dataSelection.dimension
          ]);
          if (availableDataSelection) {
            const avaialableDataSelectionIndex = mergedDataSelections.indexOf(
              availableDataSelection
            );
            mergedDataSelections = [
              ..._.slice(mergedDataSelections, 0, avaialableDataSelectionIndex),
              {
                ...availableDataSelection,
                ...dataSelection,
                items: _.uniqBy(
                  [...availableDataSelection.items, ...dataSelection.items],
                  'id'
                )
              },
              ..._.slice(mergedDataSelections, avaialableDataSelectionIndex + 1)
            ];
          } else {
            mergedDataSelections = [...mergedDataSelections, dataSelection];
          }
        });
      }
    );

    return mergedDataSelections;
  }
);

export const getCurrentDashboardVisualizationLoadingProgress = createSelector(
  getCurrentDashboardVisualizationItems,
  getVisualizationObjectEntities,
  (dashboardVisualizationItems: any, visualizationObjectEntities: any) => {
    const visualizationObjects: Visualization[] = _.map(
      dashboardVisualizationItems,
      (dashboardVisualization: any) => {
        const visualizationObject: Visualization =
          visualizationObjectEntities[dashboardVisualization.id];
        return visualizationObject;
      }
    );

    const loadedPercent =
      _.reduce(
        _.map(visualizationObjects, (visualizationObject: Visualization) => {
          return visualizationObject
            ? visualizationObject.progress
              ? visualizationObject.progress.percent
              : 0
            : 0;
        }),
        (sum, n) => sum + n
      ) || 0;

    const loadedVisualizationObjects = _.filter(
      visualizationObjects,
      (visualizationObject: Visualization) => {
        return visualizationObject
          ? visualizationObject.progress
            ? visualizationObject.progress.percent === 100
            : false
          : false;
      }
    );

    const lastLoadedVisualizationObject = _.last(loadedVisualizationObjects);

    const totalPercent = visualizationObjects.length * 100;
    return {
      message: lastLoadedVisualizationObject
        ? `Loading data for ${lastLoadedVisualizationObject.name}....`
        : 'Discovering visualization items...',
      percent: ((loadedPercent / totalPercent || 0) * 100).toFixed(0),
      loadedItems: loadedVisualizationObjects.length,
      totalItems: visualizationObjects.length
    };
  }
);
