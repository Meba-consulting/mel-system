import * as _ from 'lodash';

export function formatReportsForDataTable(items, reportGroup) {
  let formattedItems = [];
  _.each(_.orderBy(items, ['name'], ['asc']), (item, index) => {
    if (
      item.userGroupAccesses.length > 0 &&
      _.filter(item.userGroupAccesses, {
        id: reportGroup.id
      }).length > 0
    ) {
      formattedItems.push({
        position: formattedItems.length + 1,
        id: item.id,
        type: item.type ? item.type : 'reports',
        name: item.name,
        action: {
          id: item.id,
          canView: true,
          type: item.type ? item.type : 'reports'
        }
      });
    }
  });
  return formattedItems;
}

export function getReportGroups(userGroups) {
  let groups = [];
  _.each(userGroups, userGroup => {
    if (
      userGroup.name.toLowerCase().indexOf('_report') > -1 &&
      userGroup.name.toLowerCase().indexOf('_reports_') == -1
    ) {
      groups.push({
        id: userGroup.id,
        name: userGroup.name
          .replace('_REPORTS ', '')
          .replace('_reports ', '')
          .replace('_REPORT ', '')
          .replace('_report ', '')
      });
    }
  });
  return _.orderBy(groups, ['name'], ['asc']);
}
