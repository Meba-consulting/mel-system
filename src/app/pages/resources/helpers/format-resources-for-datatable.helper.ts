import * as _ from 'lodash';

export function formatResourcesForDataTable(items, currentUser) {
  let formattedItems = [];
  _.each(_.orderBy(items, ['name'], ['asc']), (item, index) => {
    // control access for the current user
    if (item.userGroupAccesses) {
      _.each(item.userGroupAccesses, (userGroup) => {
        if (
          _.filter(currentUser.userGroups, { name: 'MAINTENANCE' }).length >
            0 ||
          (_.filter(currentUser.userGroups, { id: userGroup.userGroupUid }) &&
            _.filter(currentUser.userGroups, { id: userGroup.userGroupUid })
              .length > 0)
        ) {
          if (
            _.filter(formattedItems, { id: item.id }) &&
            _.filter(formattedItems, { id: item.id }).length > 0
          ) {
          } else {
            formattedItems.push({
              position: formattedItems.length + 1,
              name: item.name,
              id: item.id,
              userGroupAccesses: item.userGroupAccesses
                ? item.userGroupAccesses
                : null,
              publicAccess: item.publicAccess ? item.publicAccess : null,
              type: item.external ? 'Link' : 'File',
              action: {
                url: item.external ? item.url : item.href + '/data',
                external: item.external,
                id: item.id,
                canDelete:
                  _.filter(currentUser.userGroups, {
                    name: 'MAINTENANCE',
                  }) &&
                  _.filter(currentUser.userGroups, { name: 'MAINTENANCE' })
                    .length > 0
                    ? true
                    : false,
                canShare:
                  _.filter(currentUser.userGroups, {
                    name: 'MAINTENANCE',
                  }) &&
                  _.filter(currentUser.userGroups, { name: 'MAINTENANCE' })
                    .length > 0
                    ? true
                    : false,
              },
            });
          }
        }
      });
    }
  });
  return formattedItems;
}
