import * as _ from 'lodash';

export function createTabsForGeneralRegistration(userGroups, currentUser) {
  const generalRegUserGroup = (_.filter(userGroups, { id: 'YWW6rmKzVMz' }) ||
    [])[0];
  return _.map(generalRegUserGroup?.managedGroups, (group) => {
    return {
      name: group?.name
        .toLowerCase()
        ?.replace('_general registration', '')
        .toUpperCase(),
      id: group?.id,
    };
  });
}
