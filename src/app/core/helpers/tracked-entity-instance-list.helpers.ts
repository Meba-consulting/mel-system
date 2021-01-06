import * as _ from 'lodash';

export function getTrackedEntityInstanceReportTable(queryResponse) {
  let headers = [];

  let displayedColumns = [];
  _.map(queryResponse?.headers, (header, index) => {
    if (index == 1 || index > 6) {
      headers = [
        ...headers,
        {
          dataIndex: index,
          name: header?.column,
          id: header?.name,
        },
      ];
      displayedColumns = [...displayedColumns, header?.name];
    }
  });
  displayedColumns = [...displayedColumns, 'action'];
  headers = [...headers, { id: 'action' }];

  const dataRows = _.map(queryResponse?.rows, (row) => {
    let data = {};
    _.map(headers, (header) => {
      data[header?.id] =
        header?.id != 'action'
          ? row[header?.dataIndex]
          : { ...data, id: row[0] };
    });
    return data;
  });
  return {
    displayedColumns: displayedColumns,
    data: dataRows,
    headers: _.keyBy(headers, 'id'),
  };
}
