import * as _ from 'lodash';
import * as Highcharts from 'highcharts';
import { cleanFavouriteData } from './favouriteHelpers';

export function getFavouriteDataDimensions(configs: any) {
  let Items = [];
  configs.dataDimensionItems.forEach(dataDimensionItem => {
    Items.push(
      dataDimensionItem.indicator
        ? dataDimensionItem.indicator.id
        : dataDimensionItem.dataElement.id
    );
  });

  return Items.join(';');
}

export function processTable(tableData, tableConfigs) {
  // console.log(
  //   'table-configurations :: ',
  //   tableConfigs,
  //   'table-data',
  //   tableData
  // );
}

export function renderAnalyticsData(id: string, value: string) {
  document.getElementById(id).innerHTML = '<span>' + value + '</span>';
}

export function prepareAnalyticsUrl(favoriteConfig: any) {
  let url = 'analytics?dimension=dx:';
  favoriteConfig.dataDimensionItems.forEach(dataDimension => {
    if (dataDimension.dataDimensionItemType === 'DATA_ELEMENT') {
      url += dataDimension.dataElement.id + ';';
    }

    if (dataDimension.dataDimensionItemType === 'INDICATOR') {
      url += dataDimension.indicator.id + ';';
    }
  });

  // console.log('analytics url', url);
}

export function fetchFunctionsData() {}

export function processConfigs(
  favouriteConfigurations: any,
  favouriteData: any
) {
  let options;
  let categories: Array<string> = [];
  if (favouriteConfigurations.category == 'ou') {
    _.each(favouriteData.metaData.dimensions.ou, ou => {
      categories.push(favouriteData.metaData.items[ou].name);
    });
  } else if (favouriteConfigurations.category == 'pe') {
    _.each(favouriteData.metaData.dimensions.pe, pe => {
      categories.push(favouriteData.metaData.items[pe].name);
    });
  } else if (favouriteConfigurations.category == 'dx') {
    _.each(favouriteData.metaData.dimensions.dx, dx => {
      categories.push(favouriteData.metaData.items[dx].name);
    });
  }

  let data: Array<{}> = cleanFavouriteData(
    favouriteConfigurations,
    favouriteData
  );

  switch (favouriteConfigurations.type) {
    case 'COLUMN':
      options = {
        chart: {
          type: 'column'
        },
        title: {
          text: favouriteConfigurations.displayName
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: categories,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: data
      };
      break;
    case 'STACKED_COLUMN':
      options = {
        chart: {
          type: 'column'
        },
        title: {
          text: favouriteConfigurations.displayName.toLowerCase()
        },
        xAxis: {
          categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Total fruit consumption'
          },
          stackLabels: {
            enabled: true,
            style: {
              fontWeight: 'bold',
              color:
                // theme
                (Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                'gray'
            }
          }
        },
        legend: {
          align: 'right',
          x: -30,
          verticalAlign: 'top',
          y: 25,
          floating: true,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [
          {
            name: 'John',
            data: [5, 3, 4, 7, 2]
          },
          {
            name: 'Jane',
            data: [2, 2, 3, 2, 1]
          },
          {
            name: 'Joe',
            data: [3, 4, 4, 2, 5]
          }
        ]
      };
      break;

    case 'PIE':
      options = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: favouriteConfigurations.displayName
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.y:.1f}'
            }
          }
        },
        series: [
          {
            name: 'Brands',
            colorByPoint: true,
            data: data
          }
        ]
      };
      break;

    case 'GAUGE':
      options = {};
      break;

    case 'LINE':
      options = {
        title: {
          text: favouriteConfigurations.displayName
        },

        subtitle: {
          text: ''
        },

        yAxis: {
          title: {
            text: ''
          }
        },

        xAxis: {
          categories: categories,
          crosshair: true
        },
        series: [{ name: '', data: data }],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
                }
              }
            }
          ]
        }
      };
      break;

    case 'BAR':
      options = {};
      break;

    case 'STACKED_BAR':
      options = {};
      break;

    case 'AREA':
      options = {};
      break;
  }

  return options;
}

export function renderFavorite(id: string, options: any) {
  // console.log('options to render', options);

  Highcharts.chart(id, options);
}
