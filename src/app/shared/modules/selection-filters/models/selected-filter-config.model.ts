import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';

export interface SelectionFilterConfig {
  showDataFilter?: boolean;
  showPeriodFilter?: boolean;
  showOrgUnitFilter?: boolean;
  showLayout?: boolean;
  showFilterButton?: boolean;
  orgUnitFilterConfig?: OrgUnitFilterConfig;
}
