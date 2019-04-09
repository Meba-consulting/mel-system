export function getRelativeBiMonthPeriods() {
  const periods = [
    { id: 'THIS_BIMONTH', name: 'This Bi-month' },
    {
      id: 'LAST_BIMONTH',
      name: 'Last Bi-month'
    },
    { id: 'LAST_6_BIMONTHS', name: 'Last 6 bi-month' }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeBiMonth';
    return period;
  });
}
