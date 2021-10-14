import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { containers } from './containers';
import { components, dashboardEntryComponents } from './components';
import { pipes } from './pipes';
import { SharingFilterModule } from './modules/sharing-filter/sharing-filter.module';
import { FavoriteFilterModule } from './modules/favorite-filter/favorite-filter.module';
import { NgxDhis2VisualizationModule } from './modules/ngx-dhis2-visualization/ngx-dhis2-visualization.module';
import { NgxDhis2SelectionFiltersModule } from './modules/ngx-dhis2-data-selection-filter/ngx-dhis2-selection-filters.module';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { dashboardReducers } from '../store/reducers';
import { effects } from '../store/effects';
import { materialModules } from 'src/app/shared/materials-modules';
import { DashboardItemEditComponent } from './components/dashboard-item-edit/dashboard-item-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SelectionFiltersModalComponent } from './components/selection-filters-modal/selection-filters-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    DashboardRoutingModule,
    NgxDhis2VisualizationModule,
    NgxDhis2SelectionFiltersModule,
    TranslateModule.forChild(),
    SharingFilterModule,
    FavoriteFilterModule,
    DragDropModule,
    ...dashboardReducers,
    ...materialModules,
    EffectsModule.forFeature(effects),
  ],
  declarations: [...containers, ...components, ...pipes],
  entryComponents: [
    DashboardItemEditComponent,
    SelectionFiltersModalComponent,
    ...dashboardEntryComponents,
  ],
})
export class DashboardModule {}
