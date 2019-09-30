import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { directives } from './directives';
import { filterModules } from './modules';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ...filterModules,
    MatButtonModule
  ],
  declarations: [NgxDhis2SelectionFiltersComponent, ...directives],
  exports: [NgxDhis2SelectionFiltersComponent]
})
export class NgxDhis2SelectionFiltersModule {}
