import { formatDateToYYMMDD } from '../../data-entry/helpers';

import * as _ from 'lodash';
export function getClubInfoFromFormValues(values) {
  console.log('values', values);
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

  // console.log(formattedData);
  return formattedData;
}

export function formatClubsForDatatableList(clubs) {
  // console.log('clubs', clubs);
  return _.map(clubs?.listGrid?.rows, (club, index) => {
    return {
      position: index + 1,
      region: club[1],
      council: club[4],
      name: club[6],
      uuid: club[8],
      action: '',
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
