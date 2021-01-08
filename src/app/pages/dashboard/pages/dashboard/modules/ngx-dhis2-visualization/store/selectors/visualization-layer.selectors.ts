import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as _ from 'lodash';
import {
  getVisualizationObjectEntities,
  getVisualizationLayerEntities,
  getVisualizationUiConfigurationEntities,
  getVisualizationLayerState,
} from '../reducers';
import {
  Visualization,
  VisualizationUiConfig,
  VisualizationLayer,
} from '../../models';
import {
  getVisualizationMetadataIdentifiers,
  getVisualizationLayout,
} from '../../helpers';
import { VisualizationLayerState } from '../reducers/visualization-layer.reducer';

export const getCurrentVisualizationObjectLayers = (visualizationId: string) =>
  createSelector(
    getVisualizationObjectEntities,
    getVisualizationLayerEntities,
    getVisualizationUiConfigurationEntities,
    (
      visualizationObjectEntities,
      visualizationLayerEntities,
      visualizationUiConfigurationEntities
    ) => {
      const currentVisualizationObject: Visualization =
        visualizationObjectEntities[visualizationId];
      if (!currentVisualizationObject) {
        return [];
      }

      const currentVisualizationUiConfiguration: VisualizationUiConfig =
        visualizationUiConfigurationEntities[visualizationId];
      return currentVisualizationUiConfiguration.showBody
        ? _.map(
            _.filter(
              _.map(
                currentVisualizationObject.layers,
                (layerId: string) => visualizationLayerEntities[layerId]
              ),
              (layer: VisualizationLayer) => layer
            ),
            (visualizationLayer: any) => {
              return {
                ...visualizationLayer,
                metadataIdentifiers: getVisualizationMetadataIdentifiers(
                  visualizationLayer.dataSelections
                ),
                layout:
                  visualizationLayer.layout ||
                  getVisualizationLayout(visualizationLayer.dataSelections),
              };
            }
          )
        : [];
    }
  );

export const getSingleVisualizationReloadCondition = createSelector(
  getVisualizationLayerState,
  (state: VisualizationLayerState) => state.singleVisualizationCheckCondition
);
