export function removePeriodFromList(periodList: any[], period: any) {
  if (!period) {
    return periodList;
  }
  const availablePeriodIndex = (periodList || []).indexOf(
    (periodList || []).find(periodItem => periodItem.id === period.id)
  );

  return availablePeriodIndex !== -1
    ? [
        ...periodList.slice(0, availablePeriodIndex),
        ...periodList.slice(availablePeriodIndex + 1)
      ]
    : periodList;
}
