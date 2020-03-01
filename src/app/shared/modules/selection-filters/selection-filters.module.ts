import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { TranslateModule } from '@ngx-translate/core';

import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { InterventionFilterModule } from './modules/intervention-filter/intervention-filter.module';
import { pipes } from './pipes';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [NgxDhis2SelectionFiltersComponent, ...pipes],
  exports: [NgxDhis2SelectionFiltersComponent, NgxDhis2OrgUnitFilterModule],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxDhis2PeriodFilterModule,
    NgxDhis2OrgUnitFilterModule,
    InterventionFilterModule,
    MatButtonModule
  ]
})
export class SelectionFiltersModule {}
