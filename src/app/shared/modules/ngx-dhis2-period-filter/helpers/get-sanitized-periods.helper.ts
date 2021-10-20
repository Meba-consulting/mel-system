import { getPeriodType } from './get-period-type.helper';
import { getPeriodName } from './get-period-name.helper';
import { PeriodFilterConfig } from '../models/period-filter-config.model';

export function getSanitizedPeriods(
  periods: any[],
  periodConfig: PeriodFilterConfig,
  calendar: string
) {
  return (periods || []).map((period: any) => {
    const periodId = period.id.toString();
    const periodType =
      period.type || getPeriodType({ ...period, id: periodId });

    return {
      ...period,
      id: periodId,
      name:
        period.name ||
        getPeriodName(periodId, periodType, periodConfig, calendar),
      type: periodType,
    };
  });
}
