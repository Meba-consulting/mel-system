import * as _ from 'lodash';

export function filterProgramsByDepartments(programs, currentDepartment) {
  return _.filter(_.orderBy(programs, ['name'], ['asc']), (program) => {
    const userGroupAccess = _.filter(program.userGroupAccesses, {
      id: currentDepartment.id,
    });
    if (userGroupAccess && userGroupAccess.length > 0) {
      return program;
    }
  });
}

export function filterProgramsForDataTable(programs, department) {
  return _.map(programs, (program, index) => {
    return {
      position: index + 1,
      name: program.name,
      id: program.id,
      department: department.name,
      category: 'event',
      type: program.programStages[0].dataEntryForm ? 'entry' : 'upload',
      action: {
        id: program.id,
        canManage: true,
      },
    };
  });
}

export function formatProgramsForDataEntry(programs, dataSets?) {
  console.log('dataSets', dataSets);
  console.log('programs', programs);
  return [
    ..._.map(
      _.filter(programs, (program) => {
        if (
          (_.filter(program?.userGroupAccesses, { id: 'R0Jl6z5svOO' }) || [])
            ?.length > 0
        ) {
          return program;
        }
      }),
      (filteredProgram) => {
        return {
          ...filteredProgram,
          stagesEntryOnly:
            (
              _.filter(filteredProgram?.userGroupAccesses, {
                id: 'zPJVf1XCu75',
              }) || []
            )?.length > 0
              ? true
              : false,
        };
      }
    ),
    ...dataSets,
  ];
}
