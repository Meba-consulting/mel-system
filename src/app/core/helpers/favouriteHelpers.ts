import * as _ from 'lodash';

export function cleanFavouriteData(favouriteConfigurations, favouriteData) {
  let data: Array<any> = [];

  if (favouriteConfigurations.series == 'dx') {
    let valueIndex = _.findIndex(favouriteData.headers, (headerRow: any) => {
      return headerRow.name == 'value' ? true : false;
    });

    favouriteData.metaData.dimensions.dx.forEach(dx => {
      let dxArray: Array<any> = [];

      _.each(
        _.filter(favouriteData.rows, data => {
          return data[0] == dx ? true : false;
        }),
        favDataRow => {
          if (favouriteConfigurations.type == 'PIE') {
            data.push({
              name: favouriteData.metaData.items[dx].name,
              y: parseFloat(favDataRow[valueIndex])
            });
          } else {
            dxArray.push(parseFloat(favDataRow[valueIndex]));

            data.push({
              name: favouriteData.metaData.items[dx].name,
              data: dxArray
            });
          }
        }
      );
    });

    return data;
  } else if (favouriteConfigurations.series == 'pe') {
    let valueIndex = _.findIndex(favouriteData.headers, (headerRow: any) => {
      return headerRow.name == 'value' ? true : false;
    });

    favouriteData.metaData.dimensions.dx.forEach(dx => {
      let dxArray: Array<any> = [];

      _.each(
        _.filter(favouriteData.rows, data => {
          return data[0] == dx ? true : false;
        }),
        favDataRow => {
          if (favouriteConfigurations.type == 'LINE') {
            data.push(parseFloat(favDataRow[valueIndex]));
          }
        }
      );
    });

    return data;
  } else if (favouriteConfigurations.series == 'ou') {
  }
}
