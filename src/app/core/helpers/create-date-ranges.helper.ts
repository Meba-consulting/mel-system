export function createDateRanges(date) {
  if (
    date.length <= 4 &&
    date !== 'THIS_YEAR' &&
    date !== 'LAST_YEAR' &&
    date !== 'LAST_5_YEARS'
  ) {
    return {
      startDate: date + '-01-01',
      endDate: date + '-12-31',
    };
  } else if (date.length > 4) {
    if (date.indexOf('Q') == -1) {
      return {
        startDate: date.substring(0, 4) + '-' + date.substring(4) + '-01',
        endDate: date.substring(0, 4) + '-' + date.substring(4) + '-31',
      };
    }
  }
}
