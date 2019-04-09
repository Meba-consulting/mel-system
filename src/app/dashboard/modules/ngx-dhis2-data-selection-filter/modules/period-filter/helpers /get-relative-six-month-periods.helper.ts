export function getRelativeSixMonthPeriods() {
  const periods = [
    { id: 'THIS_SIX_MONTH', name: 'This Six-month' },
    {
      id: 'LAST_SIX_MONTH',
      name: 'Last Six-month'
    },
    { id: 'LAST_2_SIXMONTHS', name: 'Last 2 Six-month', selected: true }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeSixMonth';
    return period;
  });
}
