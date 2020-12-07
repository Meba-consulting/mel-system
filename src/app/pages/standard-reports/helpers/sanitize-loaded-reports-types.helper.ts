export function sanitizeLoadedReportsTypes(reports) {
  if (reports['reports']) {
    return reports['reports'];
  } else {
    return reports;
  }
}
