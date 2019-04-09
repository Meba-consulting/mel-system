export function getQuarterlyPeriods(year) {
  const periods = [
    { id: year + 'Q4', name: 'October - December ' + year },
    {
      id: year + 'Q3',
      name: 'July - September ' + year
    },
    { id: year + 'Q2', name: 'April - June ' + year },
    {
      id: year + 'Q1',
      name: 'January - March ' + year
    }
  ];

  return periods.map((period: any) => {
    period.type = 'Quarterly';
    return period;
  });
}
