export function getRelativeMonthPeriods() {
  const periods = [
    { id: 'THIS_MONTH', name: 'This Month' },
    { id: 'LAST_MONTH', name: 'Last Month' },
    {
      id: 'LAST_3_MONTHS',
      name: 'Last 3 Months'
    },
    { id: 'LAST_6_MONTHS', name: 'Last 6 Months' },
    { id: 'LAST_12_MONTHS', name: 'Last 12 Months' }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeMonth';
    return period;
  });
}
