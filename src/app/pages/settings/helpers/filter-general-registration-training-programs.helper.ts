import * as _ from 'lodash';

export function filterTrainingPrograms(programs) {
  return _.filter(programs, (program) => {
    if (
      (_.filter(program?.userGroupAccesses, { id: 'JDdGfYehQut' }) || [])
        ?.length > 0
    ) {
      return program;
    }
  });
}

export function filterBillingLawsAndPoliciesPrograms(
  programs,
  currentUser,
  userGroups,
  selectedGroup
) {
  let tabGroupForProgram = (_.filter(userGroups, { id: selectedGroup?.id }) ||
    [])[0]?.managedGroups[0];
  if (tabGroupForProgram) {
    return _.map(
      _.filter(programs, (program) => {
        if (
          (
            _.filter(program?.userGroupAccesses, {
              id: tabGroupForProgram?.id,
            }) || []
          )?.length > 0
        ) {
          return program;
        }
      }),
      (prog) => {
        console.log(prog);
        return {
          ...prog,
          programStages: _.map(prog?.programStages, (stage) => {
            return {
              ...stage,
              repeatable:
                (
                  _.filter(stage?.userGroupAccesses, { id: 'lyufq6SM1vQ' }) ||
                  []
                )?.length > 0
                  ? true
                  : false,
            };
          }),
          updateStages:
            (
              _.filter(prog?.userGroupAccesses, {
                id: 'H3LCJNIfB0h',
              }) || []
            )?.length > 0
              ? true
              : false,
        };
      }
    );
  } else {
    return [];
  }
}
