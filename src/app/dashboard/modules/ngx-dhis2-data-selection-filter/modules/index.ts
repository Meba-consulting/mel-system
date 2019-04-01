import { DataFilterModule } from './data-filter/data-filter.module';
import { PeriodFilterModule } from './period-filter/period-filter.module';
import { NgxDhis2OrgUnitFilterModule } from '@hisptz/ngx-dhis2-org-unit-filter';
import { LayoutModule } from './layout/layout.module';
import { NgxDhis2DynamicDimensionModule } from './ngx-dhis2-dynamic-dimension/ngx-dhis2-dynamic-dimension.module';

export const filterModules: any[] = [
  DataFilterModule,
  PeriodFilterModule,
  NgxDhis2OrgUnitFilterModule,
  LayoutModule,
  NgxDhis2DynamicDimensionModule
];
