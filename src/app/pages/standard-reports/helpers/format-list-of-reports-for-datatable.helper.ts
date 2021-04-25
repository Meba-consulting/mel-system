import * as _ from 'lodash';

export function formatReportsForDataTable(items, reportGroup) {
  let formattedItems = [];
  if (reportGroup?.id !== 'other') {
    _.each(_.orderBy(items, ['name'], ['asc']), (item, index) => {
      if (
        item.userGroupAccesses.length > 0 &&
        _.filter(item.userGroupAccesses, {
          id: reportGroup.id,
        }).length > 0
      ) {
        formattedItems.push({
          position: formattedItems.length + 1,
          id: item.id,
          type: item.type ? item.type : 'reports',
          name: item.name,
          action: {
            id: item.id,
            name: item.name,
            canView: true,
            type: item.type ? item.type : 'reports',
          },
        });
      }
    });
  } else {
    _.each(_.orderBy(items, ['name'], ['asc']), (item, index) => {
      if (item.userGroupAccesses.length === 0) {
        formattedItems.push({
          position: formattedItems.length + 1,
          id: item.id,
          type: item.type ? item.type : 'reports',
          name: item.name,
          action: {
            id: item.id,
            name: item.name,
            canView: true,
            type: item.type ? item.type : 'reports',
          },
        });
      }
    });
  }

  return formattedItems;
}

export function getReportGroups(userGroups, type?) {
  let groups = [];
  _.each(userGroups, (userGroup) => {
    if (
      userGroup.name.toLowerCase().indexOf(type.toLowerCase()) == 0 &&
      userGroup.name.toLowerCase() !== type.toLowerCase()
    ) {
      groups.push({
        id: userGroup.id,
        name: userGroup.name
          .replace(type + '', '')
          .replace(type.toLowerCase() + '', ''),
      });
    }
  });
  return _.orderBy(groups, ['name'], ['asc']);
}
