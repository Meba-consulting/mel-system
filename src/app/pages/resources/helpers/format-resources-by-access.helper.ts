import * as _ from 'lodash';

export function formatResourcesByAccess(groups, resouces) {
  let newResources = {};
  // merge managed groups to groups
  _.each(
    _.orderBy(mergeManagedGroupsToGroups(groups), ['name'], ['asc']),
    group => {
      let resourcesByGroup = [];
      _.each(resouces, resouce => {
        if (_.filter(resouce.userGroupAccesses, { id: group.id }).length > 0) {
          resourcesByGroup.push(resouce);
        }
      });
      newResources[group.id] = resourcesByGroup;
    }
  );
  console.log('newResources', newResources);
  return newResources;
}

export function getProceduresGroups(currentUser) {
  let proceduresGroups = [];

  _.each(currentUser.userGroups, userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_procedure') > -1) {
      proceduresGroups.push({
        id: userGroup.id,
        name: _.capitalize(
          userGroup.name
            .replace('_PROCEDURES ', '')
            .replace('_procedures ', '')
            .replace('_PROCEDURE ', '')
            .replace('_procedure ', '')
        ).toUpperCase()
      });
    }
  });
  return _.orderBy(proceduresGroups, ['name'], ['asc']);
}

export function getFormsGroups(currentUser) {
  let formsGroups = [];

  _.each(currentUser.userGroups, userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_form') == 0) {
      formsGroups.push({
        id: userGroup.id,
        name: _.capitalize(
          userGroup.name
            .replace('_FORMS ', '')
            .replace('_forms ', '')
            .replace('_FORM ', '')
            .replace('_form ', '')
        ).toUpperCase()
      });
    }
  });
  return _.orderBy(formsGroups, ['name'], ['asc']);
}

export function getFormsDepartmentsGroups(currentUser) {
  let managedGroups = [];
  let allDepartmentGroups = _.map(
    filterDepartmentsForForms(currentUser.userGroups),
    userGroup => {
      const group = {
        id: userGroup.id,
        name: userGroup.name
          .toLowerCase()
          .replace('_forms ', '')
          .replace('_form ', '')
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

export function getProceduresDepartmentsGroups(currentUser) {
  let managedGroups = [];
  let allDepartmentGroups = _.map(
    filterDepartments(currentUser.userGroups),
    userGroup => {
      const group = {
        id: userGroup.id,
        name: userGroup.name
          .toLowerCase()
          .replace('_procedures ', '')
          .replace('_procedure ', '')
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
        .replace('_procedures ', '')
        .replace('_procedure ', '')
        .replace('_forms ', '')
        .replace('_form ', '')
        .toUpperCase()
    }
  ];
}

function filterDepartments(dps) {
  return _.filter(_.orderBy(dps, ['name'], ['asc']), userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_procedure') == 0) {
      return userGroup;
    } else {
    }
  });
}

function filterDepartmentsForForms(dps) {
  return _.filter(_.orderBy(dps, ['name'], ['asc']), userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_form') == 0) {
      return userGroup;
    } else {
    }
  });
}

function mergeManagedGroupsToGroups(groups) {
  let formattedGroups = groups;
  _.each(groups, group => {
    if (group.managedGroups && group.managedGroups.length > 0) {
      _.each(group.managedGroups, managedGroup => {
        formattedGroups = [...formattedGroups, managedGroup];
      });
    }
  });
  return formattedGroups;
}
