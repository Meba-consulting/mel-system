export function getRelativeFinancialYearPeriods() {
  const periods = [
    { id: 'THIS_FINANCIAL_YEAR', name: 'This Financial Year' },
    {
      id: 'LAST_FINANCIAL_YEAR',
      name: 'Last Financial Year'
    },
    { id: 'LAST_5_FINANCIAL_YEARS', name: 'Last 5 Financial Years' }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeFinancialYear';
    return period;
  });
}
