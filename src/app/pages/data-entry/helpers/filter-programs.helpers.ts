import * as _ from 'lodash';

export function filterProgramsByDepartments(programs, currentDepartment) {
  return _.filter(_.orderBy(programs, ['name'], ['asc']), program => {
    const userGroupAccess = _.filter(program.userGroupAccesses, {
      id: currentDepartment.id
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
      type: program.programStages[0].dataEntryForm ? 'entry' : 'upload'
    };
  });
}
