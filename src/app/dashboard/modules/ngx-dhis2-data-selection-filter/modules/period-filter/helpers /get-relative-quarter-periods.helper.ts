export function getRelativeQuarterPeriods() {
  const periods = [
    { id: 'THIS_QUARTER', name: 'This Quarter' },
    {
      id: 'LAST_QUARTER',
      name: 'Last Quarter'
    },
    { id: 'LAST_4_QUARTERS', name: 'Last 4 Quarters' }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeQuarter';
    return period;
  });
}
