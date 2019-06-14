import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDhis2DictionaryModule } from '@iapps/ngx-dhis2-dictionary';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { NgxDhis2SelectionFiltersModule } from '../ngx-dhis2-data-selection-filter/ngx-dhis2-selection-filters.module';
import { components } from './components';
import { VisualizationWidgetComponent } from './components/visualization-widget/visualization-widget.component';
import { containers } from './containers';
import { MapModule } from './modules/map/map.module';
import { NgxDhis2ChartModule } from './modules/ngx-dhis-chart/ngx-dhis2-chart.module';
import { NgxDhis2TableModule } from './modules/ngx-dhis2-table/ngx-dhis2-table.module';
import { ReportsModule } from './modules/reports/reports.module';
import { pipes } from './pipes';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

// store
// import { MapModule } from './modules/map/map.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot(),
    StoreModule.forFeature('visualization', reducers),
    EffectsModule.forFeature(effects),
    NgxDhis2ChartModule,
    NgxDhis2TableModule,
    NgxDhis2DictionaryModule,
    NgxDhis2SelectionFiltersModule,
    MapModule,
    ReportsModule
  ],
  declarations: [
    ...pipes,
    ...components,
    ...containers,
    VisualizationWidgetComponent
  ],
  exports: [...containers]
})
export class NgxDhis2VisualizationModule {}
