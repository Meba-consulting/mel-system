export function getSixMonthlyPeriods(year) {
  const periods = [
    { id: year + 'S1', name: 'January - June ' + year },
    {
      id: year + 'S2',
      name: 'July - December ' + year
    }
  ];

  return periods.map((period: any) => {
    period.type = 'SixMonthly';
    return period;
  });
}
