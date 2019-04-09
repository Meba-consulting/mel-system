export function getRelativeWeekPeriods() {
  const periods = [
    { id: 'THIS_WEEK', name: 'This Week' },
    { id: 'LAST_WEEK', name: 'Last Week' },
    {
      id: 'LAST_4_WEEKS',
      name: 'Last 4 Weeks'
    },
    { id: 'LAST_12_WEEKS', name: 'last 12 Weeks' },
    { id: 'LAST_52_WEEKS', name: 'Last 52 weeks' }
  ];

  return periods.map((period: any) => {
    period.type = 'RelativeWeek';
    return period;
  });
}
