import { VisualizationDataSelection } from '../models';
import * as _ from 'lodash';

export function getVisualizationMetadataIdentifiers(
  dataSelections: VisualizationDataSelection[]
): Array<string> {
  // TODO add support for dynamic dimensions
  const dxDimension = _.find(dataSelections, ['dimension', 'dx']);

  if (!dxDimension) {
    return [];
  }

  return _.map(dxDimension.items, item =>
    item.type === 'FUNCTION_RULE'
      ? `${item.functionObject ? item.functionObject.id + '.' : ''}${item.id}`
      : item.id.split('.')[0]
  );
}
