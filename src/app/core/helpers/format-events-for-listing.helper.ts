export function formatEventsForListing(events, dataElements) {
  let formattedData = [];
  events.map((event) => {
    let data = {};
    data['eventDate'] = event?.eventDate;
    data['event'] = event?.event;
    data['orgUnit'] = event?.orgUnit;
    data['orgUnitName'] = event?.orgUnitName;
    data['program'] = event?.program;
    data['programStage'] = event?.programStage;
    data['status'] = event?.status;
    data['program'] = event?.program;
    data['storedBy'] = event?.storedBy;
    data['notes'] = event?.notes;
    event?.dataValues.map((dataValue) => {
      data[dataValue?.dataElement] = {
        value: dataValue?.value,
        ...(dataElements.filter((elem) => elem?.id == dataValue?.dataElement) ||
          [])[0],
      };
    });
    formattedData = [...formattedData, data];
  });
  return formattedData;
}
