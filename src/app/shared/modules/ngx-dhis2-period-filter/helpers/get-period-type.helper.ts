export function getPeriodType(selectedPeriod: any) {
  let periodType = 'Monthly';
  if (selectedPeriod) {
    const periodId = selectedPeriod.id;

    const numberLikePeriod = parseInt(periodId, 10);

    // Find if selected period id has type of yearly yearly
    if (!isNaN(numberLikePeriod)) {
      if (periodId.length === 4) {
        periodType = 'Yearly';
      } else if (periodId.indexOf('B') !== -1) {
        periodType = 'BiMonthly';
      } else if (periodId.indexOf('Q') !== -1) {
        periodType = 'Quarterly';
      } else if (periodId.indexOf('AprilS') !== -1) {
        periodType = 'SixMonthlyApril';
      } else if (periodId.indexOf('April') !== -1) {
        periodType = 'FinancialApril';
      } else if (periodId.indexOf('S') !== -1) {
        periodType = 'SixMonthly';
      } else if (periodId.indexOf('July') !== -1) {
        periodType = 'FinancialJuly';
      } else if (periodId.indexOf('Oct') !== -1) {
        periodType = 'FinancialOctober';
      }
    } else {
      if (periodId.indexOf('QUARTER') !== -1) {
        periodType = 'RelativeQuarter';
      } else if (periodId.indexOf('WEEK') !== -1) {
        periodType = 'RelativeWeek';
      } else if (periodId.indexOf('MONTH') !== -1) {
        if (periodId.indexOf('BIMONTH') !== -1) {
          periodType = 'RelativeBiMonth';
        } else if (periodId.indexOf('SIX_MONTH') !== -1) {
          periodType = 'RelativeSixMonth';
        } else {
          periodType = 'RelativeMonth';
        }
      } else if (periodId.indexOf('YEAR') !== -1) {
        if (periodId.indexOf('FINANCIAL_YEAR') !== -1) {
          periodType = 'RelativeFinancialYear';
        } else {
          periodType = 'RelativeYear';
        }
      }
    }
  }

  return periodType;
}
