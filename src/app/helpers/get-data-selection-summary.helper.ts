import * as _ from 'lodash';
import { VisualizationDataSelection } from '../dashboard/modules/ngx-dhis2-visualization/models';

export function getDataSelectionSummary(
  dataSelections: VisualizationDataSelection[]
) {
  const ouDimension = _.find(dataSelections, ['dimension', 'ou']);

  const ouItems: any[] = ouDimension ? ouDimension.items : [];

  const ouSection = _.join(
    _.take(_.map(ouItems, (item: any) => item.name), 3),
    ', '
  );

  const moreOuSection =
    ouItems.length > 3 ? ` and ${ouItems.length - 3} more ` : '';

  const peDimension = _.find(dataSelections, ['dimension', 'pe']);
  const peItems: any[] = peDimension ? peDimension.items : [];
  const peSection = _.uniq(
    _.filter(
      [
        (_.head(peItems) || { name: '' }).name,
        (_.last(peItems) || { name: '' }).name
      ],
      peName => peName !== undefined || peName !== ''
    )
  ).join(' - ');

  return ouSection !== '' && peSection !== ''
    ? `Showing data from <b>${ouSection}${moreOuSection}</b> in the period${
        peItems.length > 1 ? 's' : ''
      } ${peItems.length > 1 ? 'between' : 'of'} <b>${peSection}</b>`
    : '';
}
