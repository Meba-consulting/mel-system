import { formatDateToYYMMDD } from '../../data-entry/helpers';

import * as _ from 'lodash';
export function getClubInfoFromFormValues(values) {
  let formattedData = {
    attributeValues: [
      {
        value: (
          _.filter(values?.clubcategory?.options, {
            key: values?.clubcategory?.value,
          }) || []
        )?.name,
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

  console.log(formattedData);
  return formattedData;
}

export function formatClubsForDatatableList(clubs) {
  console.log('clubs', clubs);
  return _.map(clubs?.listGrid?.rows, (club, index) => {
    console.log(index);
    return {
      position: index + 1,
      region: club[1],
      council: club[4],
      name: club[6],
      action: '',
    };
  });
}
