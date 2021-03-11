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
  console.log('ous', ous);
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
  return _.map(data?.rows, (row, index) => {
    return {
      position: index + 1,
      firstName: row[7],
      middleName: row[8],
      lastName: row[9],
      gender: row[10],
      dob: row[11],
      startDate: row[12],
      endDate: row[13],
      eventId: row[0],
      orgUnit: row[3],
      action: { eventId: row[0], orgUnit: row[3] },
    };
  });
}
