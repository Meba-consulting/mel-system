import * as _ from 'lodash';

export function createTabsForGeneralRegistration(userGroups, currentUser) {
  const keyValuePairedUserGroups = _.keyBy(currentUser?.userGroups, 'id');
  const generalRegUserGroup = (_.filter(userGroups, { id: 'YWW6rmKzVMz' }) ||
    [])[0];
  return _.orderBy(
    _.map(generalRegUserGroup?.managedGroups, (group) => {
      return {
        ...(userGroups.filter((userGroup) => userGroup?.id === group?.id) ||
          [])[0],
        name: group?.name
          .toLowerCase()
          ?.replace('_general registration', '')
          .toUpperCase(),
        id: group?.id,
        managedGroups: _.map(group?.managedGroups, (managedGroup) => {
          return {
            ...(userGroups.filter(
              (userGroup) => userGroup?.id === managedGroup?.id
            ) || [])[0],
            id: managedGroup?.id,
            name: managedGroup?.name
              ?.toLowerCase()
              ?.replace('_general registration ', '')
              .toUpperCase(),
          };
        }).filter(
          (managedGroupToFilter) =>
            keyValuePairedUserGroups[managedGroupToFilter?.id]
        ),
      };
    }).filter((regAccessGroup) => keyValuePairedUserGroups[regAccessGroup?.id]),
    ['name'],
    ['asc']
  );
}
