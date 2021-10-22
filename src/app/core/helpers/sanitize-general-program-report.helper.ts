import { keyBy } from 'lodash';

function identifyStageWithMaxEvents(data, stages) {
  let eventCounts = [];
  stages.forEach((stage) => {
    eventCounts = [...eventCounts, data[stage?.id].length];
  });
  return eventCounts.sort()[eventCounts.length - 1];
}

export function sanitizeGeneralReportFromTrackedEntityInstancesAndAssociatedEvents(
  program,
  progamData,
  filterBy?
) {
  const formattedData = progamData.map((data, index) => {
    let formattedData: any = {
      attributeValues: keyBy(data.attributes, 'attribute'),
      events: data.events,
      position: index + 1,
    };
    program?.programStages.forEach((programStage) => {
      formattedData[programStage?.id] =
        (
          data.events.filter(
            (event) => event?.programStage === programStage?.id
          ) || []
        ).map((event) => {
          return {
            ...event,
            keyedDataValues: keyBy(event.dataValues, 'dataElement'),
          };
        }) || [];
    });
    formattedData['maxCountOfEvents'] = identifyStageWithMaxEvents(
      formattedData,
      program?.programStages
    );
    return formattedData;
  });
  return !filterBy || filterBy === 'all'
    ? formattedData
    : formattedData.filter(
        (dataRow) =>
          dataRow.attributeValues &&
          dataRow.attributeValues.length > 0 &&
          dataRow.attributeValues['ek3AWEEIOBJ'] &&
          dataRow.attributeValues['ek3AWEEIOBJ']?.storedBy === filterBy
      ) || [];
}
