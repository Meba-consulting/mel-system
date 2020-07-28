import * as _ from 'lodash';

export function formatResourcesForDataTable(items, currentUser) {
  let formattedItems = [];
  _.each(items, (item, index) => {
    // control access for the current user
    if (item.userGroupAccesses) {
      _.each(item.userGroupAccesses, userGroup => {
        if (
          userGroup.displayName.indexOf('_VIEW_DOC') > -1 &&
          _.filter(currentUser.userGroups, { id: userGroup.userGroupUid }) &&
          _.filter(currentUser.userGroups, { id: userGroup.userGroupUid })
            .length > 0
        ) {
          formattedItems.push({
            position: index + 1,
            name: item.name,
            type: item.external ? 'Link' : 'File',
            action: {
              url: item.external ? item.url : item.href + '/data',
              external: item.external,
              id: item.id,
              canDelete:
                _.filter(currentUser.userGroups, {
                  name: '_MAINTENANCE IMS'
                }) &&
                _.filter(currentUser.userGroups, { name: '_MAINTENANCE IMS' })
                  .length > 0
                  ? true
                  : false
            }
          });
        }
      });
    }
  });
  return formattedItems;
}
