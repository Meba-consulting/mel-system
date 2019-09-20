import { VisualizationDataSelection } from '../models';
import { sortBy } from 'lodash';

export function getVisualizationLayerSubtitle(
  dataSelections: VisualizationDataSelection[]
): string {
  return sortBy(
    dataSelections.filter(
      (dataSelection: VisualizationDataSelection) =>
        dataSelection.layout === 'filters'
    ),
    ['layoutOrder']
  )
    .map((dataSelection: VisualizationDataSelection) => dataSelection.title)
    .join(' - ');
}
