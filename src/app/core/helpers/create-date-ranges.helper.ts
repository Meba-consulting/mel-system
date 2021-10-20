export function createDateRanges(date) {
  if (date === 'THIS_YEAR') {
    return {
      startDate: new Date().getFullYear() + '-01-01',
      endDate: new Date().getFullYear() + '-12-31',
    };
  } else if (date === 'LAST_YEAR') {
    return {
      startDate: Number(new Date().getFullYear()) - 1 + '-01-01',
      endDate: Number(new Date().getFullYear()) - 1 + '-12-31',
    };
  } else if (date.length <= 4) {
    return {
      startDate: date + '-01-01',
      endDate: date + '-12-31',
    };
  } else if (date.length > 4) {
    if (date.indexOf('Q') == -1) {
      return {
        startDate: date.substring(0, 4) + '-' + date.substring(4) + '-01',
        endDate:
          date.substring(0, 4) +
          '-' +
          date.substring(4) +
          '-' +
          lastDayOfTheMonth(
            Number(date.substring(0, 4)),
            Number(date.substring(4))
          ),
      };
    } else {
      const lastMonth = getLastMonthOfTheQuarter(date.substring(4));
      const startMonth = getStartMonthOfTheQuarter(date.substring(4));
      return {
        startDate:
          date.substring(0, 4) + '-' + formatNumber(startMonth) + '-01',
        endDate:
          date.substring(0, 4) +
          '-' +
          formatNumber(lastMonth) +
          '-' +
          lastDayOfTheMonth(Number(date.substring(0, 4)), Number(lastMonth)),
      };
    }
  }
}

function lastDayOfTheMonth(y, m): number {
  return new Date(y, m, 0).getDate();
}

function getStartMonthOfTheQuarter(q) {
  if (q === 'Q1') {
    return 1;
  } else if (q === 'Q2') {
    return 4;
  } else if (q === 'Q3') {
    return 7;
  } else if (q === 'Q4') {
    return 10;
  }
}

function getLastMonthOfTheQuarter(q) {
  if (q === 'Q1') {
    return 3;
  } else if (q === 'Q2') {
    return 6;
  } else if (q === 'Q3') {
    return 9;
  } else if (q === 'Q4') {
    return 12;
  }
}

function formatNumber(n) {
  console.log('NUM', n);
  if (n.toString().length == 1) {
    return '0' + n;
  } else {
    return n;
  }
}
