import * as _ from 'lodash';

export function checkIfCurrentUserCanAddNew(configs, currentUser) {
  const canAddNewGroup = _.filter(configs.groups, { order: 1 });
  if (canAddNewGroup && canAddNewGroup.length > 0) {
    const userGroup = _.filter(currentUser.userGroups, {
      id: canAddNewGroup[0].id
    });
    if (userGroup && userGroup.length > 0) {
      return true;
    }
  } else {
    return false;
  }
}

export function deduceCurrentUserGroupForAction(
  dataEntryFlowConfigs,
  resource,
  currentUser,
  status
) {
  const userGroup =
    _.filter(dataEntryFlowConfigs.groups, {
      id: resource.currentGroupIdActed
    }) &&
    _.filter(dataEntryFlowConfigs.groups, { id: resource.currentGroupIdActed })
      .length > 0
      ? _.filter(dataEntryFlowConfigs.groups, {
          id: resource.currentGroupIdActed
        })[0]
      : null;
  let currentUserGroup = null;
  if (userGroup) {
    currentUserGroup = _.filter(dataEntryFlowConfigs.groups, {
      order: userGroup.order + 1
    });
  }
  if (
    userGroup &&
    currentUserGroup &&
    currentUserGroup.length > 0 &&
    userGroup &&
    status == 'ACTIVE'
  ) {
    return {
      group: currentUserGroup[0],
      shouldComplete:
        currentUserGroup[0].order == dataEntryFlowConfigs.groups.length
          ? true
          : false,
      allowed:
        _.filter(currentUser.groups, {
          id: resource.currentGroupIdActed
        }) &&
        _.filter(currentUser.userGroups, {
          id: currentUserGroup[0].id
        }).length > 0
          ? true
          : false
    };
  } else {
    return {
      group: null,
      shouldComplete: null,
      allowed:
        getUserAllGroupsApplicableInUploadedFilesSharing.length > 0
          ? true
          : false
    };
  }
}

function getUserAllGroupsApplicableInUploadedFilesSharing(
  idOfTheCurrentGroupActed,
  dataEntryFlowConfigs,
  currentUser
): any[] {
  let groups = [];
  const currentGroup = _.filter(dataEntryFlowConfigs.groups, {
    id: idOfTheCurrentGroupActed
  });
  if (currentGroup && currentGroup.length > 0) {
    groups = _.filter(dataEntryFlowConfigs.groups, group => {
      if (
        group.order <= currentGroup[0].order &&
        _.filter(currentUser.userGroups, group.id) &&
        _.filter(currentUser.userGroups, group.id).length > 0
      ) {
        return group;
      }
    });
  }
  return groups;
}
