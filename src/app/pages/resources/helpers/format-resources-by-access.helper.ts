import * as _ from 'lodash';

export function formatResourcesByAccess(groups, resouces) {
  let newResources = {};
  _.each(groups, group => {
    let resourcesByGroup = [];
    _.each(resouces, resouce => {
      if (_.filter(resouce.userGroupAccesses, { id: group.id }).length > 0) {
        resourcesByGroup.push(resouce);
      }
    });
    newResources[group.id] = resourcesByGroup;
  });
  return newResources;
}

export function getProceduresGroups(currentUser) {
  let proceduresGroups = [];

  _.each(currentUser.userGroups, userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_procedure') > -1) {
      proceduresGroups.push({
        id: userGroup.id,
        name: userGroup.name
          .replace('_PROCEDURES ', '')
          .replace('_procedures ', '')
          .replace('_PROCEDURE ', '')
          .replace('_procedure ', '')
      });
    }
  });
  return proceduresGroups;
}

export function getFormsGroups(currentUser) {
  let formsGroups = [];

  _.each(currentUser.userGroups, userGroup => {
    if (userGroup.name.toLowerCase().indexOf('_form') == 0) {
      formsGroups.push({
        id: userGroup.id,
        name: userGroup.name
          .replace('_FORMS ', '')
          .replace('_forms ', '')
          .replace('_FORM ', '')
          .replace('_form ', '')
      });
    }
  });
  return formsGroups;
}
