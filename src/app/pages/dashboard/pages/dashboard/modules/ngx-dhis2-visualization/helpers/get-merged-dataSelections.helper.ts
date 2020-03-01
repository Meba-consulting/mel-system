import * as _ from 'lodash';
import { VisualizationDataSelection } from '../models';
import { updateDataSelectionBasedOnPreferences } from './update-data-selection-based-preference.helper';
import { checkIfDataSelectionHasDynamicDimension } from './check-if-data-selection-has-dynamic-dimension.helper';

export function getMergedDataSelections(
  existingDataSelections: VisualizationDataSelection[],
  newDataSelections: VisualizationDataSelection[],
  visualizationType: string,
  favoritePreferences: {
    reportTable: {
      includeOrgUnitChildren: boolean;
      excludeOrgUnitChildren: boolean;
    };
    chart: { includeOrgUnitChildren: boolean; excludeOrgUnitChildren: boolean };
  } = {
    reportTable: {
      includeOrgUnitChildren: false,
      excludeOrgUnitChildren: false
    },
    chart: { includeOrgUnitChildren: false, excludeOrgUnitChildren: false }
  }
): any[] {
  if (
    checkIfDataSelectionHasDynamicDimension(newDataSelections) &&
    checkIfDataSelectionHasDynamicDimension(existingDataSelections)
  ) {
    existingDataSelections = _.filter(
      existingDataSelections || [],
      (dataSelection: any) =>
        ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) !== -1
    );
  }
  const unAvailableDataSelections: VisualizationDataSelection[] = _.filter(
    newDataSelections,
    (dataSelection: VisualizationDataSelection) =>
      !_.find(existingDataSelections, ['dimension', dataSelection.dimension])
  );

  const mergedDataSelections = _.map(
    existingDataSelections,
    (dataSelection: VisualizationDataSelection) => {
      const matchingDataSelection: VisualizationDataSelection = _.find(
        newDataSelections,
        ['dimension', dataSelection.dimension]
      );

      return updateDataSelectionBasedOnPreferences(
        matchingDataSelection && matchingDataSelection.changed
          ? _.omit({ ...dataSelection, ...matchingDataSelection }, 'changed')
          : dataSelection,
        visualizationType,
        favoritePreferences
      );
    }
  );

  return _.filter(
    [...unAvailableDataSelections, ...mergedDataSelections],
    (dataSelection: any) =>
      dataSelection ? dataSelection.items.length > 0 : false
  );
}
