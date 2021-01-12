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

export function filterBillingLawsAndPoliciesPrograms(programs) {
  return _.filter(programs, (program) => {
    if (
      (_.filter(program?.userGroupAccesses, { id: 'EJlv9Z2mZu2' }) || [])
        ?.length > 0
    ) {
      return program;
    }
  });
}
