import { NgxDhis2PeriodFilterModule } from 'src/app/shared/modules/ngx-dhis2-period-filter/ngx-dhis2-period-filter.module';
import { NgxDhis2OrgUnitFilterModule } from 'src/app/shared/modules/org-unit-filter/ngx-dhis2-org-unit-filter.module';

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
  VisualizationOptionsModule,
];
