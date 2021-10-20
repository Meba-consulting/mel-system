export function getAvailablePeriods(selectedPeriods: any[], periods = []) {
  // remove selected periods
  return (periods || []).filter(
    (period: any) =>
      !(selectedPeriods || []).find(
        (selectedPeriod: any) =>
          (selectedPeriod.id || '').toString() === (period.id || '').toString()
      )
  );
}
