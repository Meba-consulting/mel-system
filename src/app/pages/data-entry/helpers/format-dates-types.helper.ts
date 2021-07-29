import * as _ from 'lodash';
import {
  monthsOfTheYear,
  quartersOfTheYear,
} from 'src/app/core/constants/constants.constant';

export function getReportDates(selectedReport) {
  let reportPeriodSelected;
  let now = new Date();
  if (selectedReport['reportingFrequency'] == 'Monthly') {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    reportPeriodSelected = {
      id:
        now.getFullYear() +
        formatSingleStringToPair(Number(now.getMonth()) + 1),
      name: monthNames[now.getMonth()] + ' ' + now.getFullYear().toString(),
      startDate:
        now.getFullYear().toString() +
        '-' +
        formatSingleStringToPair(Number(now.getMonth()) + 1) +
        '-01',
      endDate:
        now.getFullYear().toString() +
        '-' +
        formatSingleStringToPair(Number(now.getMonth()) + 2) +
        '-' +
        formatSingleStringToPair(Number(now.getDay())),
    };
  } else {
    if (now.getMonth() + 1 < 4) {
      reportPeriodSelected = {
        id: now.getFullYear() + 'Q1',
        name: 'January - March' + ' ' + now.getFullYear().toString(),
        startDate: now.getFullYear().toString() + '-01' + '-01',
        endDate:
          now.getFullYear().toString() +
          '-' +
          formatSingleStringToPair(Number(now.getMonth()) + 1) +
          '-' +
          formatSingleStringToPair(Number(now.getDay()) + 2),
      };
    } else if (now.getMonth() + 1 >= 4 && now.getMonth() + 1 < 7) {
      reportPeriodSelected = {
        id: now.getFullYear() + 'Q2',
        name: 'April - June' + ' ' + now.getFullYear().toString(),
        startDate: now.getFullYear().toString() + '-01' + '-01',
        endDate:
          now.getFullYear().toString() +
          '-' +
          formatSingleStringToPair(Number(now.getMonth()) + 1) +
          '-' +
          formatSingleStringToPair(Number(now.getDay()) + 2),
      };
    } else if (now.getMonth() + 1 >= 7 && now.getMonth() + 1 < 10) {
      reportPeriodSelected = {
        id: now.getFullYear() + 'Q3',
        name: 'July - September' + ' ' + now.getFullYear().toString(),
        startDate: now.getFullYear().toString() + '-01' + '-01',
        endDate:
          now.getFullYear().toString() +
          '-' +
          formatSingleStringToPair(Number(now.getMonth()) + 1) +
          '-' +
          formatSingleStringToPair(Number(now.getDay()) + 2),
      };
    } else {
      reportPeriodSelected = {
        id: now.getFullYear() + 'Q4',
        name: 'October - December' + ' ' + now.getFullYear().toString(),
        startDate: now.getFullYear().toString() + '-01' + '-01',
        endDate:
          now.getFullYear().toString() +
          '-' +
          formatSingleStringToPair(Number(now.getMonth()) + 1) +
          '-' +
          formatSingleStringToPair(Number(now.getDay()) + 2),
      };
    }
  }
  return reportPeriodSelected;
}

export function formatSingleStringToPair(no) {
  if (no.toString().length == 1) {
    return '0' + no.toString();
  } else {
    return no.toString();
  }
}

function checkIfLeapYear(month, year, possibleEndDate) {
  let dateForLeapYear = '';
  if (month == '02' && Number(year) % 4 == 0) {
    dateForLeapYear = '29';
  } else {
    dateForLeapYear = possibleEndDate;
  }
  return dateForLeapYear;
}

export function getFormattedPeriodsByPeriodType(yearlyPe, periodType) {
  let periods = [];
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  periodType === 'Monthly'
    ? _.forEach(monthsOfTheYear, (month) => {
        if (
          Number(yearlyPe) < currentYear ||
          (Number(yearlyPe) === currentYear &&
            Number(month.value) < currentMonth)
        ) {
          periods = [
            ...periods,
            {
              id: yearlyPe + month.value,
              name: month.name + ' ' + yearlyPe,
              startDate: yearlyPe + '-' + month.value + '-01',
              endDate:
                yearlyPe +
                '-' +
                month.value +
                '-' +
                checkIfLeapYear(month.value, yearlyPe, month.endDate),
            },
          ];
        }
      })
    : periodType === 'Quarterly'
    ? _.map(quartersOfTheYear, (quarter) => {
        if (
          Number(yearlyPe) < currentYear ||
          (Number(yearlyPe) === currentYear &&
            Number(quarter.endMonth) < currentMonth)
        ) {
          periods = [
            ...periods,
            {
              id: yearlyPe + quarter.id,
              name: quarter.name + ' ' + yearlyPe,
              startDate: yearlyPe + '-' + quarter.startMonth + '-01',
              endDate:
                yearlyPe + '-' + quarter.endMonth + '-' + quarter.endDate,
            },
          ];
        }
      })
    : periods == [];
  return periods;
}
