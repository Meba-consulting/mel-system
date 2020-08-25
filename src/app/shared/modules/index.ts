import { SelectionFiltersModule } from './selection-filters/selection-filters.module';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { SelectFilterModule } from './select-filter/select-filter.module';
import { NgxDhis2CustomFormsEntryModule } from '@iapps/ngx-dhis2-custom-forms-entry';
export const modules: any[] = [
  SelectionFiltersModule,
  NgxDhis2OrgUnitFilterModule,
  SelectFilterModule,
  NgxDhis2CustomFormsEntryModule
];
