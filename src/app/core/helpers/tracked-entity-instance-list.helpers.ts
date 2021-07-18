import * as _ from 'lodash';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';

export function getTrackedEntityInstanceReportTable(
  queryResponse,
  savedUserDataStore,
  program?,
  category?,
  currentUser?
) {
  let headers = [];
  let keyedAttributes = {};

  const keyedSavedColumns = !savedUserDataStore?.message
    ? _.keyBy(savedUserDataStore, 'id')
    : {};

  let displayedColumns = [];
  _.map(queryResponse?.headers, (header, index) => {
    // if (index == 1 || index > 6) {
    headers = [
      ...headers,
      {
        dataIndex: index,
        name: header?.column,
        id: header?.name,
      },
    ];
    if (savedUserDataStore?.message) {
      displayedColumns = [...displayedColumns, header?.name];
    } else {
      if (keyedSavedColumns[header?.name]?.show) {
        displayedColumns = [...displayedColumns, header?.name];
      }
    }
    // }
  });
  keyedAttributes = { ...keyedAttributes, ..._.keyBy(headers, 'id') };
  if (program) {
    program?.programTrackedEntityAttributes.forEach(
      (programTrackedEntityAttribute) => {
        keyedAttributes[
          programTrackedEntityAttribute?.trackedEntityAttribute?.id
        ] = programTrackedEntityAttribute;
      }
    );
  }
  displayedColumns = [...displayedColumns, 'action'];
  headers = [...headers, { id: 'action' }];

  const createdByIndex = _.indexOf(displayedColumns, 'ek3AWEEIOBJ');

  const dataRows =
    _.map(queryResponse?.rows, (row) => {
      let data = {};
      if (
        !category ||
        category === 'all' ||
        (category && category === row[createdByIndex])
      ) {
        _.map(headers, (header) => {
          data[header?.id] =
            header?.id != 'action'
              ? formatData(row[header?.dataIndex], header?.id, keyedAttributes)
              : { ...data, id: row[0] };
        });
        data['reportedByMe'] =
          category === row[createdByIndex] ||
          (currentUser &&
            row[createdByIndex] === currentUser?.userCredentials?.username);
        return data;
      } else {
        return null;
      }
    }).filter((formattedData) => formattedData) || [];
  return {
    displayedColumns: displayedColumns.filter(
      (column) =>
        column != 'ou' &&
        column != 'instance' &&
        column != 'te' &&
        column != 'inactive' &&
        column != 'lastupdated'
    ),
    data: dataRows,
    headers: _.keyBy(headers, 'id'),
    columns: queryResponse?.headers,
  };
}

function formatData(data, elementId, keyedAttributes) {
  if (
    (keyedAttributes[elementId] &&
      keyedAttributes[elementId]?.valueType === 'DATE') ||
    elementId === 'created'
  ) {
    return data.substring(0, 10);
  } else {
    return data;
  }
}
