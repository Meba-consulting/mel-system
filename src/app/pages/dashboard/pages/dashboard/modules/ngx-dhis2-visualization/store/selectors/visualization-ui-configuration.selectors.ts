import {
  getVisualizationObjectEntities,
  getVisualizationUiConfigurationEntities,
  getVisualizationUiConfigurationState,
} from '../reducers';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Visualization, VisualizationUiConfig } from '../../models';
import { getFocusedVisualizationState } from '../reducers/visualization-ui-configuration.reducer';
export const getCurrentVisualizationUiConfig = (visualizationId: string) =>
  createSelector(
    getVisualizationUiConfigurationEntities,
    (visualizationUiConfigurationEntities) => {
      if (
        visualizationUiConfigurationEntities[visualizationId]
          ?.visualizationType !== 'SINGLE_VALUE'
      ) {
        return visualizationUiConfigurationEntities[visualizationId];
      } else {
        return null;
      }
    }
  );

export const getFocusedVisualization = createSelector(
  getVisualizationUiConfigurationState,
  getFocusedVisualizationState
);
