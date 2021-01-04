import { SelectionFiltersModule } from './selection-filters/selection-filters.module';
// import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { SelectFilterModule } from './select-filter/select-filter.module';
import { NgxDhis2CustomFormsEntryModule } from './custom-forms-entry/ngx-dhis2-custom-forms-entry.module';
import { FormModule } from './forms/forms.module';
import { NgxDhis2OrgUnitFilterModule } from './org-unit-filter/ngx-dhis2-org-unit-filter.module';
export const modules: any[] = [
  SelectionFiltersModule,
  SelectFilterModule,
  NgxDhis2CustomFormsEntryModule,
  FormModule,
  NgxDhis2OrgUnitFilterModule,
];
