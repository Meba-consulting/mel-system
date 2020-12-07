import * as _ from 'lodash';

export function getDepartmentsFromUserGroups(currentUser) {
  let managedGroups = [];
  let allDepartmentGroups = _.map(
    filterDepartments(currentUser.userGroups),
    userGroup => {
      const group = {
        id: userGroup.id,
        name: userGroup.name
          .toLowerCase()
          .replace('dpt: ', '')
          .toUpperCase(),
        managedGroups:
          userGroup.managedGroups.length > 0
            ? getManagedGroupsDetails(
                userGroup.managedGroups,
                currentUser.userGroups
              )
            : []
      };
      managedGroups =
        userGroup.managedGroups.length > 0
          ? [...managedGroups, ...userGroup.managedGroups]
          : managedGroups;
      return group;
    }
  );
  let newDepts = [];
  _.each(allDepartmentGroups, dept => {
    if (
      _.filter(managedGroups, { id: dept.id }) &&
      _.filter(managedGroups, { id: dept.id }).length == 0
    ) {
      newDepts.push(dept);
    }
  });
  return newDepts;
}

function getManagedGroupsDetails(managedGroups, userGroups) {
  let groups = [];
  _.each(managedGroups, group => {
    groups = [
      ...groups,
      ...formatDept(_.filter(userGroups, { id: group.id })[0])
    ];
  });
  return _.orderBy(groups, ['name'], ['asc']);
}

function formatDept(dept) {
  return [
    {
      id: dept.id,
      name: dept.name
        .toLowerCase()
        .replace('dpt: ', '')
        .toUpperCase()
    }
  ];
}

function filterDepartments(dps) {
  return _.filter(_.orderBy(dps, ['name'], ['asc']), userGroup => {
    if (userGroup.name.indexOf('DPT: ') == 0) {
      return userGroup;
    } else {
    }
  });
}
