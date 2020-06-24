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
    values['id'] =
      entityAttribute['trackedEntityInstance'] + '-trackedEntityInstance';

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

export function formatDateYYMMDD(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

export function createEventsDataValuesObject(dataElements, events) {
  let headers = [];
  let data = [];
  _.map(events, event => {
    let values = {};
    values['id'] = event['event'];
    values['created'] = event['created'];
    headers.push({ id: 'created', name: 'Created', valueType: 'DATE' });
    // values['updated'] = event['lastUpdated'];
    // headers.push({ id: 'updated', name: 'Updated', valueType: 'DATE' });
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
  return {
    headers: _.take(_.uniqBy(headers, 'id'), 15),
    data: data
  };
}

export function getProgramStagesAsForms(programMetadata) {
  let forms = [];
  _.each(programMetadata['programStages'], programStage => {
    forms.push(programStage);
  });
  return forms;
}

export function filterFormsByAccessGroups(forms, currentUser, programMetadata) {
  let filteredForms = [];
  _.each(currentUser.userGroups, userGroup => {
    if (userGroup.name.indexOf('_DATA_ENTRY') > -1) {
      _.each(forms, form => {
        if (_.filter(form.userGroupAccesses, { id: userGroup.id }).length > 0) {
          filteredForms.push({
            ...form,
            ...{
              category: userGroup.name.split('_DATA_ENTRY')[1],
              categoryId: userGroup.id,
              trackerProgramId: 'IzEQE6HnpoC',
              trackedEntityType: 'GypuFqZTCTf'
            }
          });
        }
      });
    }
  });
  let defaultForm = {
    program: programMetadata.id,
    id: 'default',
    name: 'Additive Inspection Form',
    category: programMetadata['userGroupAccesses'][0]['displayName'].split(
      '_DATA_ENTRY'
    )[1],
    categoryId: programMetadata['userGroupAccesses'][0]['id'],
    dataEntryForm: programMetadata.dataEntryForm,
    programStageDataElements: programMetadata.programTrackedEntityAttributes,
    trackerProgramId: 'IzEQE6HnpoC',
    trackedEntityType: 'GypuFqZTCTf'
  };
  return [
    ...[defaultForm],
    ..._.orderBy(filteredForms, ['sortOrder'], ['asc'])
  ];
}

export function formatFormsListForDataTable(forms) {
  let formattedForms = [];
  _.each(forms, (form, index) => {
    formattedForms.push({ ...form, ...{ position: index + 1 } });
  });
  return formattedForms;
}

export function createDisplayColumns(headers) {
  let columns = [];
  _.each(headers, header => {
    columns.push(header.id);
  });
  return columns;
}

export function createKeyedHeaders(headers) {
  let keyedHeaders = {};
  _.each(headers, header => {
    keyedHeaders[header.id] =
      header.name.split(':').length > 1
        ? header.name.split(':')[1]
        : header.name.split(':')[0];
  });
  return keyedHeaders;
}

export function createArrayOfObjectByHeadersAndDataValues(headers, dataValues) {
  let dataValuesForTable = [];
  _.each(dataValues, dataValueObj => {
    let dataForOneEvent = {};
    _.each(headers, (header, index) => {
      if (header.valueType == 'DATE') {
        dataForOneEvent[header.id] = formatDateYYMMDD(dataValueObj[header.id]);
      } else {
        dataForOneEvent[header.id] = dataValueObj[header.id];
      }
    });
    dataForOneEvent['id'] = dataValueObj['id'];
    dataValuesForTable.push(dataForOneEvent);
  });
  return dataValuesForTable;
}

export function createBatchs(trackedEntityInstances) {
  let batchs = [];
  _.each(trackedEntityInstances, trackedEntityInstance => {
    batchs.push({
      id: trackedEntityInstance.trackedEntityInstance,
      name: _.filter(trackedEntityInstance['attributes'], {
        attribute: 'uj1YTZ099cu'
      })[0]['value'],
      date: trackedEntityInstance['created']
    });
  });
  return batchs;
}
