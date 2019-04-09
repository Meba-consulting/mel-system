import { getPeriodsBasedOnType } from './get-periods-based-on-type.helper';

export function getAvailablePeriods(
  selectedPeriodType: string,
  year: number,
  selectedPeriods: any[]
) {
  const periods = getPeriodsBasedOnType(selectedPeriodType, year);
  // remove selected periods
  return (periods || []).filter(
    (period: any) =>
      !(selectedPeriods || []).find(
        (selectedPeriod: any) =>
          (selectedPeriod.id || '').toString() === (period.id || '').toString()
      )
  );
}
