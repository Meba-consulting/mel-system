import * as _ from 'lodash';
export function createDataValuesObject(data) {
  return [];
}

export function formatAttributesValues(data) {
  let newData = [];
  _.map(data, entityAttribute => {
    let values = {};
    values['created'] = entityAttribute['created'];
    values['updated'] = entityAttribute['lastUpdated'];

    _.map(entityAttribute['attributes'], attr => {
      values[attr['attribute']] = attr['value'];
    });
    newData.push(values);
  });
  return newData;
}

export function filterWithContainingCharactes(arr, character) {
  let newArr = [];
  _.map(arr, item => {
    if (item.name.indexOf(character) > -1) {
      newArr.push(item);
    }
  });
  return newArr;
}

export function createEventsDataValuesObject(dataElements, events) {
  let headers = [];
  let data = [];
  _.map(events, event => {
    let values = {};
    values['created'] = event['created'];
    headers.push({ id: 'created', name: 'Created' });
    values['updated'] = event['lastUpdated'];
    headers.push({ id: 'updated', name: 'Updated' });
    _.map(dataElements, element => {
      headers.push({ id: element.id, name: element.name });
      values[element.id] =
        _.filter(event['dataValues'], { dataElement: element.id }).length > 0
          ? _.filter(event['dataValues'], { dataElement: element.id })[0][
              'value'
            ]
          : '';
    });
    data.push(values);
  });
  console.log('dataElements', dataElements);
  return {
    headers: _.uniqBy(headers, 'id'),
    data: data
  };
}
