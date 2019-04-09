export function getYearlyPeriods(year) {
  const periods = [];
  for (let i = 0; i <= 10; i++) {
    const useYear = parseInt(year, 10) - i;
    periods.push({ id: useYear, name: useYear });
  }

  return periods.map((period: any) => {
    period.type = 'Yearly';
    return period;
  });
}
