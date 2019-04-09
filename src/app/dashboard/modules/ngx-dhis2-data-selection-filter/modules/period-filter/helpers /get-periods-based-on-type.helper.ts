import { getMonthlyPeriods } from './get-monthly-periods.helper';
import { getBiMonthlyPeriods } from './get-bi-monthly-period.helper';
import { getQuarterlyPeriods } from './get-quarterly-periods.helper';
import { getSixMonthlyPeriods } from './get-six-monthly-periods.helper';
import { getSixMonthlyAprilPeriods } from './get-six-monthly-april-periods.helper';
import { getFinancialOctoberPeriods } from './get-financial-october-periods.helper';
import { getYearlyPeriods } from './get-yearly-periods.helper';
import { getFinancialJulyPeriods } from './get-financial-july-periods.helper';
import { getFinancialAprilPeriods } from './get-financial-april-periods.helper';
import { getRelativeWeekPeriods } from './get-relative-week-periods.helper';
import { getRelativeMonthPeriods } from './get-relative-month-periods.helper';
import { getRelativeBiMonthPeriods } from './get-relative-bi-month-periods.helper';
import { getRelativeQuarterPeriods } from './get-relative-quarter-periods.helper';
import { getRelativeSixMonthPeriods } from './get-relative-six-month-periods.helper';
import { getRelativeFinancialYearPeriods } from './get-relative-financial-year-periods.helper';
import { getRelativeYearPeriods } from './get-relative-year-periods.helper';

export function getPeriodsBasedOnType(periodType: string, year: number): any[] {
  switch (periodType) {
    case 'Monthly':
      return getMonthlyPeriods(year);
    case 'BiMonthly':
      return getBiMonthlyPeriods(year);
    case 'Quarterly':
      return getQuarterlyPeriods(year);
    case 'SixMonthly':
      return getSixMonthlyPeriods(year);
    case 'SixMonthlyApril':
      return getSixMonthlyAprilPeriods(year);
    case 'FinancialOct':
      return getFinancialOctoberPeriods(year);
    case 'Yearly':
      return getYearlyPeriods(year);
    case 'FinancialJuly':
      return getFinancialJulyPeriods(year);
    case 'FinancialApril':
      return getFinancialAprilPeriods(year);
    case 'RelativeWeek':
      return getRelativeWeekPeriods();
    case 'RelativeMonth':
      return getRelativeMonthPeriods();
    case 'RelativeBiMonth':
      return getRelativeBiMonthPeriods();
    case 'RelativeQuarter':
      return getRelativeQuarterPeriods();
    case 'RelativeSixMonthly':
      return getRelativeSixMonthPeriods();
    case 'RelativeFinancialYear':
      return getRelativeFinancialYearPeriods();
    case 'RelativeYear':
      return getRelativeYearPeriods();
    default:
      return [];
  }
}
