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
