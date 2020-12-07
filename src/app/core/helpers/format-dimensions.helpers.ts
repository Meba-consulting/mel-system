import * as _ from 'lodash';

export function createSelectionDimensions(
  selections,
  dx,
  dataSet,
  dataSetDimensions
) {
  const dataSetDimensionsFormatted = dataSetDimensions.dimensions
    ? _.reverse([...dataSetDimensions.dimensions, ''])
    : [];
  let dataDimensions = [];
  if (dataSetDimensionsFormatted.length == 0) {
    dataDimensions.push({
      dx: dx,
      ou: getItemsIds(_.filter(selections, { dimension: 'ou' })[0]['items'])[0],
      pe: getItemsIds(_.filter(selections, { dimension: 'pe' })[0]['items'])[0],
      ds: dataSet,
      filter: ''
    });
  } else {
    _.each(dataSetDimensionsFormatted, dataSetDimension => {
      dataDimensions.push({
        dx: dx,
        ou: getItemsIds(
          _.filter(selections, { dimension: 'ou' })[0]['items']
        )[0],
        pe: getItemsIds(
          _.filter(selections, { dimension: 'pe' })[0]['items']
        )[0],
        ds: dataSet,
        filter: dataSetDimension.dimension
          ? dataSetDimension.dimension.id + ':' + dataSetDimension.id
          : ''
      });
    });
  }
  return dataDimensions;
}

function getItemsIds(items) {
  let itemsIds = [];
  _.map(items, item => {
    itemsIds.push(item.id);
  });
  return itemsIds;
}

export function createUniqueIdFromDimensions(dimensions) {
  return (
    dimensions.dx +
    '-' +
    dimensions.filter +
    '-' +
    dimensions.pe +
    '-' +
    dimensions.ou
  );
}
