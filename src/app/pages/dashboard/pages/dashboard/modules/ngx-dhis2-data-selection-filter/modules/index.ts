import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';

import { DataFilterModule } from './data-filter/data-filter.module';
import { LayoutModule } from './layout/layout.module';
import { NgxDhis2DynamicDimensionModule } from './ngx-dhis2-dynamic-dimension/ngx-dhis2-dynamic-dimension.module';
import { VisualizationOptionsModule } from './visualization-options/visualization-options.module';

export const filterModules: any[] = [
  DataFilterModule,
  NgxDhis2PeriodFilterModule,
  NgxDhis2OrgUnitFilterModule,
  LayoutModule,
  NgxDhis2DynamicDimensionModule,
  VisualizationOptionsModule
];
