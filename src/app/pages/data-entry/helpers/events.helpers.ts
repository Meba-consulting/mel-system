import * as _ from 'lodash';
import { deduceCurrentUserGroupForAction } from './data-entry-flow-configs.helpers';
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

export function filterFormsByAccessGroups(
  forms,
  currentUser,
  programMetadata,
  trackerProgramId,
  trackedEntityType,
  trackedEntityTypeName
) {
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
              trackerProgramId: trackerProgramId,
              trackedEntityType: trackedEntityType
            }
          });
        }
      });
    }
  });
  let defaultForm = {
    program: programMetadata.id,
    id: 'default',
    name: trackedEntityTypeName,
    category: programMetadata['userGroupAccesses'][0]['displayName'].split(
      '_DATA_ENTRY'
    )[1],
    categoryId: programMetadata['userGroupAccesses'][0]['id'],
    dataEntryForm: programMetadata.dataEntryForm,
    programStageDataElements: programMetadata.programTrackedEntityAttributes,
    trackerProgramId: trackerProgramId,
    trackedEntityType: trackedEntityType
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
  columns.push('created');
  _.each(headers, header => {
    columns.push(header.id);
  });
  return columns;
}

export function createKeyedHeaders(headers) {
  let keyedHeaders = {};
  keyedHeaders['created'] = 'Created';
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

export function createBatchs(trackedEntityInstances, id) {
  let batchs = [];
  _.each(trackedEntityInstances, trackedEntityInstance => {
    batchs.push({
      id: trackedEntityInstance.trackedEntityInstance,
      name: _.filter(trackedEntityInstance['attributes'], {
        attribute: id
      })[0]['value'],
      date: trackedEntityInstance['created']
    });
  });
  return batchs;
}

export function getUserGroupsToSeeDataEntryTabs(currentUser) {
  let groups = {};
  groups['fortification'] = _.filter(currentUser['userGroups'], {
    name: '_DATA_ENTRY Fortification'
  });
  groups['HR'] = _.filter(currentUser['userGroups'], {
    name: '_DATA_ENTRY Human Resource Managemenet'
  });
  groups['waste'] = _.filter(currentUser['userGroups'], {
    name: '_DATA_ENTRY Waste & Energy Management'
  });
  groups['corrective'] = _.filter(currentUser['userGroups'], {
    name: '_DATA_ENTRY Corrective actions'
  });
  return groups;
}

export function getFileResourcesDimensions(rows, headers) {
  return _.map(rows, row => {
    return {
      id: row[row.length - 3],
      currentGroupActed: row[row.length - 2],
      currentGroupIdActed: row[row.length - 1],
      eventUid: row[0],
      dataElementUid: headers[row.length - 3].name,
      status: row[11]
    };
  });
}

export function formatFileResourcesForDataTable(
  resources,
  status,
  dataEntryFlow,
  currentUser
) {
  const data = _.filter(
    _.orderBy(_.uniqBy(resources, 'id'), ['created'], ['desc']),
    (resource, index) => {
      const controlConfigs = deduceCurrentUserGroupForAction(
        dataEntryFlow,
        resource,
        currentUser,
        status
      );
      if (
        (resource.status == status && controlConfigs.allowed) ||
        (status == 'ACTED-BY-ME' && controlConfigs.allowed)
      ) {
        return {
          name: resource.name,
          id: resource.id,
          status: resource.status,
          currentGroupActed: resource.currentGroupActed,
          currentGroupIdActed: resource.currentGroupIdActed,
          currentGroupToAct: controlConfigs.group,
          created: formatDateYYMMDD(resource.created),
          lastUpdated: resource.lastUpdated
            ? formatDateYYMMDD(resource.lastUpdated)
            : '',
          downloadPath:
            'events/files?dataElementUid=' +
            resource.dataElementUid +
            '&eventUid=' +
            resource.eventUid,
          key: resource.key,
          dataEntryFlow: dataEntryFlow,
          actions: {
            key: resource.key,
            id: resource.key
          }
        };
      }
    }
  );
  return data;
}

export function formatEventsDataIntoKeyValuePair(events) {
  return _.map(events, event => {
    return {
      id: event.event,
      values: createKeyValuePairForDataValues(event.dataValues, event)
    };
  });
}

function createKeyValuePairForDataValues(dataValues, event) {
  let dataValuesKeyValuePaired = {};
  dataValuesKeyValuePaired['created'] = event.created.substring(0, 10);
  _.each(dataValues, dataValue => {
    dataValuesKeyValuePaired[dataValue.dataElement] = dataValue.value;
  });
  return dataValuesKeyValuePaired;
}

export function listEventsDataTableData(headers, events) {
  return null;
}
