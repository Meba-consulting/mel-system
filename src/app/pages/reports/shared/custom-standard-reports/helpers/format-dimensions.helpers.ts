import * as _ from 'lodash';

export function createSelectionDimensions(selections, dxs) {
  let dimensions = [];
  _.map(dxs, dx => {
    dimensions.push({
      dx: dx,
      ou: getItemsIds(_.filter(selections, { dimension: 'ou' })[0]['items']),
      pe: getItemsIds(_.filter(selections, { dimension: 'pe' })[0]['items'])[0]
    });
  });
  return dimensions;
}

function getItemsIds(items) {
  let itemsIds = [];
  _.map(items, item => {
    itemsIds.push(item.id);
  });
  return itemsIds;
}
