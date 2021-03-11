import * as _ from 'lodash';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';

export function getTrackedEntityInstanceReportTable(
  queryResponse,
  savedUserDataStore,
  program?
) {
  let headers = [];
  const keyedAttributes = {};
  if (program) {
    program?.programTrackedEntityAttributes.forEach(
      (programTrackedEntityAttribute) => {
        keyedAttributes[
          programTrackedEntityAttribute?.trackedEntityAttribute?.id
        ] = programTrackedEntityAttribute;
      }
    );
  }

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
  displayedColumns = [...displayedColumns, 'action'];
  headers = [...headers, { id: 'action' }];

  const dataRows = _.map(queryResponse?.rows, (row) => {
    let data = {};
    _.map(headers, (header) => {
      data[header?.id] =
        header?.id != 'action'
          ? formatData(row[header?.dataIndex], header?.id, keyedAttributes)
          : { ...data, id: row[0] };
    });
    return data;
  });
  return {
    displayedColumns: displayedColumns,
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
    return formatDateToYYMMDD(new Date(data));
  } else {
    return data;
  }
}
