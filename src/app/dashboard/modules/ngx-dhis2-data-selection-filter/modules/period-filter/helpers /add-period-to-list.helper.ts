import * as _ from 'lodash';
export function addPeriodToList(periodList: any[], period: any) {
  if (!period) {
    return periodList;
  }
  return (periodList || []).some(
    (periodItem: any) => periodItem.type === period.type
  )
    ? _.uniqBy([...periodList, period].sort((a, b) => b.id - a.id), 'id')
    : periodList;
}
