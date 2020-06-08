import * as _ from 'lodash';

export function formatResourcesForDataTable(items) {
  let formattedItems = [];
  _.each(items, (item, index) => {
    formattedItems.push({
      position: index + 1,
      name: item.name,
      type: item.external ? 'Link' : 'File',
      action: {
        url: item.external ? item.url : item.href + '/data',
        external: item.external
      }
    });
  });
  return formattedItems;
}
