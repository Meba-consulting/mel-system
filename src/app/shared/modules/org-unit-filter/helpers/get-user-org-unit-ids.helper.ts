import * as _ from 'lodash';
export function getUserOrgUnitIds(userInfo: any, isForReport: boolean) {
  return _.uniq(
    _.map(
      isForReport
        ? _.orderBy(userInfo.dataViewOrganisationUnits, ['name'], ['asc']) || []
        : _.orderBy(userInfo.organisationUnits, ['name'], ['asc']) || [],
      (orgUnit) => orgUnit.id
    )
  );
}
