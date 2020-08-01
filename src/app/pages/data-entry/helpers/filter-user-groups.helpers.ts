import * as _ from 'lodash';

export function getDepartmentsFromUserGroups(currentUser) {
  return _.map(filterDepartments(currentUser.userGroups), userGroup => {
    const group = {
      id: userGroup.id,
      name: _.capitalize(userGroup.name.toLowerCase().replace('dpt: ', ''))
    };
    return group;
  });
}

function filterDepartments(dps) {
  return _.filter(_.orderBy(dps, ['name'], ['asc']), userGroup => {
    if (userGroup.name.indexOf('DPT: ') == 0) {
      return userGroup;
    } else {
    }
  });
}
