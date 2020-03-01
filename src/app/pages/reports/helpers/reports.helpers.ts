import * as _ from 'lodash';
export function getItems(items) {
  let newItems = [];
  _.map(items, item => {
    newItems.push(item.id);
  });
  return newItems;
}

export function getIndicatorIds(indicators) {
  let newIndicators = [];
  _.map(indicators, indicator => {
    newIndicators.push(indicator.id);
  });
  return newIndicators;
}

export function processAnalyticsData(analyticsData, dimensions, selectedOus) {
  let data;
  let analyticsFormat = {
    headers: [
      {
        name: 'dx',
        column: 'Data',
        valueType: 'TEXT',
        type: 'java.lang.String',
        hidden: false,
        meta: true
      },
      {
        name: 'ou',
        column: 'Organisation unit',
        valueType: 'TEXT',
        type: 'java.lang.String',
        hidden: false,
        meta: true
      },
      {
        name: 'value',
        column: 'Value',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false
      },
      {
        name: 'numerator',
        column: 'Numerator',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false
      },
      {
        name: 'denominator',
        column: 'Denominator',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false
      },
      {
        name: 'factor',
        column: 'Factor',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false
      },
      {
        name: 'multiplier',
        column: 'Multiplier',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false
      },
      {
        name: 'divisor',
        column: 'Divisor',
        valueType: 'NUMBER',
        type: 'java.lang.Double',
        hidden: false,
        meta: false
      }
    ],
    metaData: {
      items: {},
      dimensions: {
        dx: [],
        pe: [],
        ou: [],
        co: []
      }
    },
    rows: [],
    width: 0,
    height: 0
  };
  _.map(dimensions, dimension => {
    console.log(
      'dddddddddd ',
      dimension.reportId + '-' + dimension.ou + '-' + dimension.pe.join('-')
    );
    console.log(analyticsData);
    analyticsFormat.rows = _.union(
      analyticsFormat.rows,
      analyticsData[
        dimension.reportId + '-' + dimension.ou + '-' + dimension.pe.join('-')
      ]
        ? analyticsData[
            dimension.reportId +
              '-' +
              dimension.ou +
              '-' +
              dimension.pe.join('-')
          ]['data']['rows']
        : []
    );
    analyticsFormat.metaData.dimensions.co = _.union(
      analyticsFormat.metaData.dimensions.co,
      analyticsData[
        dimension.reportId + '-' + dimension.ou + '-' + dimension.pe.join('-')
      ]
        ? analyticsData[
            dimension.reportId +
              '-' +
              dimension.ou +
              '-' +
              dimension.pe.join('-')
          ]['data'].metaData.dimensions.co
        : []
    );
    analyticsFormat.metaData.dimensions.dx = _.union(
      analyticsFormat.metaData.dimensions.dx,
      analyticsData[
        dimension.reportId + '-' + dimension.ou + '-' + dimension.pe.join('-')
      ]
        ? analyticsData[
            dimension.reportId +
              '-' +
              dimension.ou +
              '-' +
              dimension.pe.join('-')
          ]['data'].metaData.dimensions.dx
        : []
    );
    analyticsFormat.metaData.dimensions.ou = _.union(
      analyticsFormat.metaData.dimensions.ou,
      analyticsData[
        dimension.reportId + '-' + dimension.ou + '-' + dimension.pe.join('-')
      ]
        ? analyticsData[
            dimension.reportId +
              '-' +
              dimension.ou +
              '-' +
              dimension.pe.join('-')
          ]['data'].metaData.dimensions.ou
        : []
    );
    analyticsFormat.metaData.dimensions.pe = _.union(
      analyticsFormat.metaData.dimensions.pe,
      analyticsData[
        dimension.reportId + '-' + dimension.ou + '-' + dimension.pe.join('-')
      ]
        ? analyticsData[
            dimension.reportId +
              '-' +
              dimension.ou +
              '-' +
              dimension.pe.join('-')
          ]['data'].metaData.dimensions.pe
        : []
    );
  });

  analyticsFormat.metaData.items = analyticsData[
    dimensions[0].reportId +
      '-' +
      dimensions[0].ou +
      '-' +
      dimensions[0].pe.join('-')
  ]
    ? analyticsData[
        dimensions[0].reportId +
          '-' +
          dimensions[0].ou +
          '-' +
          dimensions[0].pe.join('-')
      ]['data'].metaData.items
    : {};
  _.map(selectedOus, ou => {
    if (!analyticsFormat.metaData.items[ou.id]) {
      analyticsFormat.metaData.items[ou.id] = { name: ou.name };
    }
  });
  data = analyticsFormat;
  console.log(data);
  return data;
}
