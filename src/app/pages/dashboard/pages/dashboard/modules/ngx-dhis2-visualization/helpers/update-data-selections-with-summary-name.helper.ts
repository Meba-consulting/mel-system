import { VisualizationDataSelection } from '../models';
// import { OrgUnitGroup, OrgUnitLevel } from '@iapps/ngx-dhis2-org-unit-filter';
import { find, max } from 'lodash';
import { User } from '@iapps/ngx-dhis2-http-client';
import { OrgUnitGroup } from 'src/app/shared/modules/org-unit-filter/models/org-unit-group.model';
import { OrgUnitLevel } from 'src/app/shared/modules/org-unit-filter/models/org-unit-level.model';

export function updateDataSelectionsWithSummaryNames(
  dataSelections: VisualizationDataSelection[],
  orgUnitGroups: OrgUnitGroup[],
  orgUnitLevels: OrgUnitLevel[],
  currentUser: User,
  analytics: any
): VisualizationDataSelection[] {
  const userOrgUnits = currentUser
    ? currentUser.dataViewOrganisationUnits || []
    : [];

  return (dataSelections || []).map(
    (dataSelection: VisualizationDataSelection) => {
      switch (dataSelection.dimension) {
        case 'ou':
          const startingTitle = getStartingOrgUnitTitle(
            dataSelection,
            orgUnitGroups,
            orgUnitLevels
          );

          const endingTitle = getEndingOrgUnitTitle(
            dataSelection,
            orgUnitLevels,
            userOrgUnits
          );
          return {
            ...dataSelection,
            title: startingTitle
              ? `${startingTitle} in ${endingTitle}`
              : endingTitle,
          };

        case 'pe': {
          const peItems =
            analytics && analytics.metaData && analytics.metaData.pe
              ? analytics.metaData.pe
              : [];

          const metaDataNames =
            analytics && analytics.metaData && analytics.metaData.names
              ? analytics.metaData.names
              : {};

          return {
            ...dataSelection,
            title: peItems
              .map((peId: string) => metaDataNames[peId])
              .filter((peName: string) => peName)
              .join(', '),
          };
        }

        default:
          return {
            ...dataSelection,
            title: (dataSelection.items || [])
              .map((item) => item.name)
              .join(', '),
          };
      }
    }
  );
}

function getStartingOrgUnitTitle(
  dataSelection: VisualizationDataSelection,
  orgUnitGroups: OrgUnitGroup[],
  orgUnitLevels: OrgUnitLevel[]
) {
  return (dataSelection.items || [])
    .map((item) => {
      if (item.id.indexOf('LEVEL') !== -1) {
        const orgUnitLevel = find(orgUnitLevels, [
          'level',
          parseInt((item ? item.id || '' : '').slice(-1), 10),
        ]);
        return orgUnitLevel ? orgUnitLevel.name : undefined;
      }

      if (item.id.indexOf('OU_GROUP') !== -1) {
        const orgUnitGroup = find(orgUnitGroups, [
          'id',
          (item ? item.id || '' : '').split('-')[1],
        ]);
        return orgUnitGroup ? orgUnitGroup.name : undefined;
      }
    })
    .filter((name) => name)
    .join(',');
}

function getEndingOrgUnitTitle(
  dataSelection: VisualizationDataSelection,
  orgUnitLevels: OrgUnitLevel[],
  userOrgUnits
) {
  const orgUnitMinLevel = max(userOrgUnits.map((orgUnit) => orgUnit.level));

  const userOrgUnitsNames = userOrgUnits
    .map((orgUnit) => orgUnit.name)
    .join(', ');

  return (dataSelection.items || [])
    .filter(
      (item) =>
        item.id.indexOf('LEVEL') === -1 && item.id.indexOf('OU_GROUP') === -1
    )
    .map((item) => {
      switch (item.id) {
        case 'USER_ORGUNIT':
          return userOrgUnitsNames;

        case 'USER_ORGUNIT_CHILDREN': {
          const orgUnitLevel = find(orgUnitLevels, [
            'level',
            orgUnitMinLevel + 1,
          ]);

          const orgUnitLevelName = orgUnitLevel ? orgUnitLevel.name : undefined;

          return orgUnitLevelName
            ? `${orgUnitLevelName} in ${userOrgUnitsNames}`
            : `OrgUnit children in ${userOrgUnitsNames}`;
        }
        case 'USER_ORGUNIT_GRANDCHILDREN': {
          const orgUnitLevel = find(orgUnitLevels, [
            'level',
            orgUnitMinLevel + 2,
          ]);

          const orgUnitLevelName = orgUnitLevel ? orgUnitLevel.name : undefined;

          return orgUnitLevelName
            ? `${orgUnitLevelName} in ${userOrgUnitsNames}`
            : `OrgUnit grand children in ${userOrgUnitsNames}`;
        }
        default:
          return item.name;
      }
    })
    .join(', ');
}
