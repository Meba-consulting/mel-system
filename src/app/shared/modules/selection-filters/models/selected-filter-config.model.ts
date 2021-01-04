// import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';

import { OrgUnitFilterConfig } from '../../org-unit-filter/models/org-unit-filter-config.model';

export interface SelectionFilterConfig {
  showDataFilter?: boolean;
  showPeriodFilter?: boolean;
  showOrgUnitFilter?: boolean;
  showLayout?: boolean;
  showFilterButton?: boolean;
  orgUnitFilterConfig?: OrgUnitFilterConfig;
}
