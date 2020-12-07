import * as _ from 'lodash';

export function formatAnalytics(analytics) {
  let newAnalytics: {} = {};

  newAnalytics['headers'] = analytics.headers;
  newAnalytics['metaData'] = {};
  newAnalytics['metaData']['names'] = getNames(
    analytics.metaData.dimensions,
    analytics.metaData.items
  );
  newAnalytics['metaData']['items'] = analytics.metaData.items;
  newAnalytics['metaData']['dx'] = analytics['metaData']['dimensions']['dx'];
  newAnalytics['metaData']['pe'] = analytics['metaData']['dimensions']['pe'];
  newAnalytics['metaData']['ou'] = analytics['metaData']['dimensions']['ou'];
  newAnalytics['metaData']['co'] = analytics['metaData']['dimensions']['co'];
  newAnalytics['rows'] = analytics['rows'];
  newAnalytics['width'] = analytics['width'];
  newAnalytics['height'] = analytics['height'];
  newAnalytics['headerWidth'] = newAnalytics['headerWidth'];

  return newAnalytics;
}

function getNames(dimensions, items) {
  let names = {};
  _.map(
    _.union(
      _.union(
        _.union(dimensions['ou'], dimensions['dx']),
        _.union(dimensions['pe'])
      ),
      _.union(dimensions['co'])
    ),
    dimensionId => {
      names[dimensionId] = items[dimensionId].name;
    }
  );
  return names;
}

export function addAnalyticsToVisualizationLayer(analytics, favourite) {
  let layerConfig = {
    id: favourite.id,
    analytics: formatAnalytics(analytics),
    config: {
      id: favourite.id,
      name: favourite.name,
      displayName: favourite.name,
      title: favourite.name,
      showData: true,
      publicAccess: 'rw------',
      type: favourite.type,
      regressionType: 'NONE',
      completedOnly: false,
      sortOrder: 0,
      topLimit: 0,
      aggregationType: 'DEFAULT',
      visualizationType: 'CHART',
      hideTitle: false
    },
    layout: {
      rows: ['pe'],
      columns: ['dx']
    },
    preferedChartTypes: [
      {
        type: 'column',
        description: 'Column chart',
        icon: 'assets/icons/column.png'
      }
    ]
  };

  return [layerConfig];
}
