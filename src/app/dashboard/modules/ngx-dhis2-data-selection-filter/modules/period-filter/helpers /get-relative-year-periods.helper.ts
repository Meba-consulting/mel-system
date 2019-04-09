export function getRelativeYearPeriods() {
  const periods = [
    { id: 'THIS_YEAR', name: 'This Year' },
    {
      id: 'LAST_YEAR',
      name: 'Last Year'
    },
    { id: 'LAST_5_YEARS', name: 'Last 5 Years' }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeYear';
    return period;
  });
}
