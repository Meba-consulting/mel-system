import * as _ from 'lodash';
export function createDataValuesObject(data) {
  return [];
}

export function formatAttributesValues(data) {
  let newData = [];
  console.log('dataaaaaa ', data);
  _.map(data, entityAttribute => {
    let values = {};
    values['created'] = entityAttribute['created'];
    values['updated'] = entityAttribute['lastUpdated'];
    console.log(
      "entityAttribute['attributes'] ",
      entityAttribute['attributes']
    );
    _.map(entityAttribute['attributes'], attr => {
      values[attr['attribute']] = attr['value'];
    });
    newData.push(values);
  });
  return newData;
}
