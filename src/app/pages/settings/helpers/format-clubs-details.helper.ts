import { formatDateToYYMMDD } from '../../data-entry/helpers';

import * as _ from 'lodash';
export function getClubInfoFromFormValues(values) {
  let formattedData = {
    attributeValues: [
      {
        value: (_.filter(values?.clubcategory?.options, {
          key: values?.clubcategory?.value,
        }) || [])[0]?.name,
        attribute: {
          id: 'i1svsrgKdXW',
          name: 'Club Category',
        },
      },
    ],
    name: values?.name?.value,
    shortName: values?.shortname?.value,
    openingDate: formatDateToYYMMDD(values?.regdate?.value),
    parent: {
      id: values?.parent?.value,
    },
    phoneNumber: values?.phonenumber?.value,
  };
  return formattedData;
}

export function formatClubsForDatatableList(ous) {
  // console.log('ous', ous);
  return _.map(ous?.listGrid?.rows, (ou, index) => {
    return {
      position: index + 1,
      region: ou[1],
      council: ou[4],
      name: ou[6],
      uuid: ou[8],
      uid: ou[8],
      id: ou[8],
      status: ou[10] ? 'Inactive' : 'Active',
      openingDate: ou[9],
      closedDate: ou[10],
      action: {
        id: ou[8],
        uid: ou[8],
        uuid: ou[8],
        name: ou[6],
        status: ou[10] ? 'Inactive' : 'Active',
        openingDate: ou[9],
        closedDate: ou[10],
      },
    };
  });
}

export function formatClubMembers(data) {
  const headers = _.takeRight(data?.headers, data?.headers?.length - 7);
  const displayedColumns = _.map(headers, (header) => {
    return header?.name;
  });

  return {
    keyedHeaders: _.keyBy(headers, 'name'),
    headers: [{ name: 'position', column: 'SN' }, ...headers],
    displayedColumns: ['position', ...displayedColumns, 'action'],
    data: _.map(data?.rows, (row, index) => {
      let formattedData = {};
      formattedData['position'] = index + 1;
      headers.forEach((header, count) => {
        formattedData[header?.name] = row[count + 7];
      });
      return { ...formattedData, action: row };
    }),
  };
}
