export function getSixMonthlyAprilPeriods(year) {
  const useYear = parseInt(year, 10) + 1;
  const periods = [
    {
      id: year + 'AprilS2',
      name: 'October ' + year + ' - March ' + useYear,
      selected: true
    },
    { id: year + 'AprilS1', name: 'April - September ' + year }
  ];

  return periods.map((period: any) => {
    period.type = 'SixMonthly';
    return period;
  });
}
