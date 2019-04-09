export function getBiMonthlyPeriods(year) {
  const periods = [
    { id: year + '01B', name: 'January - February ' + year },
    {
      id: year + '02B',
      name: 'March - April ' + year
    },
    { id: year + '03B', name: 'May - June ' + year },
    {
      id: year + '04B',
      name: 'July - August ' + year
    },
    { id: year + '05B', name: 'September - October ' + year },
    {
      id: year + '06B',
      name: 'November - December ' + year
    }
  ];

  return periods.map((period: any) => {
    period.type = 'BiMonthly';
    return period;
  });
}
