export function getFinancialOctoberPeriods(year) {
  const periods = [];
  for (let i = 0; i <= 10; i++) {
    const useYear = parseInt(year, 10) - i;
    const currentYear = useYear + 1;
    periods.push({
      id: useYear + 'Oct',
      name: 'October ' + useYear + ' - September ' + currentYear
    });
  }

  return periods.map((period: any) => {
    period.type = 'FinancialOctober';
    return period;
  });
}
