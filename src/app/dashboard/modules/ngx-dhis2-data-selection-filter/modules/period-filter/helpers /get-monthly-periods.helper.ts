export function getMonthlyPeriods(year) {
  const periods = [
    { id: year + '12', name: 'December ' + year },
    { id: year + '11', name: 'November ' + year },
    {
      id: year + '10',
      name: 'October ' + year
    },
    { id: year + '09', name: 'September ' + year },
    { id: year + '08', name: 'August ' + year },
    {
      id: year + '07',
      name: 'July ' + year
    },
    { id: year + '06', name: 'June ' + year },
    { id: year + '05', name: 'May ' + year },
    {
      id: year + '04',
      name: 'April ' + year
    },
    { id: year + '03', name: 'March ' + year },
    { id: year + '02', name: 'February ' + year },
    {
      id: year + '01',
      name: 'January ' + year
    }
  ];

  return periods.map((period: any) => {
    period.type = 'Monthly';
    return period;
  });
}
