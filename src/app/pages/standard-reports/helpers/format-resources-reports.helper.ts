import * as _ from 'lodash';

export function getReportsResourcesGroups(currentUser) {
  let groups = [];

  _.each(currentUser.userGroups, userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_reports_upload') == 0) {
      groups.push({
        id: userGroup.id,
        name: _.capitalize(
          userGroup.name
            .replace('_REPORTS_UPLOADED ', '')
            .replace('_reports_uploaded ', '')
            .replace('_REPORTS_UPLOAD ', '')
            .replace('_reports_upload ', '')
        ).toUpperCase()
      });
    }
  });
  return _.orderBy(groups, ['name'], ['asc']);
}
