import * as _ from 'lodash';

export function createTabsForGeneralRegistration(userGroups, currentUser) {
  const keyValuePairedUserGroups = _.keyBy(currentUser?.userGroups, 'id');
  const generalRegUserGroup = (_.filter(userGroups, { id: 'YWW6rmKzVMz' }) ||
    [])[0];
  return _.orderBy(
    _.map(generalRegUserGroup?.managedGroups, (group) => {
      return {
        name: _.startCase(
          group?.name.toLowerCase()?.replace('_general registration', '')
        ),
        id: group?.id,
        managedGroups: _.map(group?.managedGroups, (managedGroup) => {
          return {
            id: managedGroup?.id,
            name: _.startCase(
              managedGroup?.name
                ?.toLowerCase()
                ?.replace('_general registration ', '')
            ),
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
