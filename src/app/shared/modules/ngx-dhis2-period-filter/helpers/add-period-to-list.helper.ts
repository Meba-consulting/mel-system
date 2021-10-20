import { uniqBy } from 'lodash';
export function addPeriodToList(periodList: any[], period: any) {
  if (!period) {
    return periodList;
  }

  if (!periodList || periodList.length === 0) {
    return [period];
  }
  return (periodList || []).some(
    (periodItem: any) => periodItem.type === period.type
  )
    ? uniqBy([...periodList, period].sort((a, b) => b.id - a.id), 'id')
    : periodList;
}
