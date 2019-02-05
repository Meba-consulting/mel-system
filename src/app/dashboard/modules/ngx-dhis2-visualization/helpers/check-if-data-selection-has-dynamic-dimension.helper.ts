import * as _ from 'lodash';
export function checkIfDataSelectionHasDynamicDimension(dataSelections: any[]) {
  return _.some(
    dataSelections || [],
    (dataSelection: any) =>
      ['ou', 'pe', 'dx', 'co', 'dy'].indexOf(dataSelection.dimension) === -1
  );
}
