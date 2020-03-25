import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { pages } from './pages';
import { SharedModule } from 'src/app/shared';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { RenderReportComponent } from './containers/render-report/render-report.component';
import { ReportsSharedModule } from './shared/reports-shared.module';
import { ReportsHeaderComponent } from './containers/reports-header/reports-header.component';
import { CapitalizeItemNamePipe } from './pipes/capitalize-item-name.pipe';

@NgModule({
  declarations: [...pages, RenderReportComponent, ReportsHeaderComponent, CapitalizeItemNamePipe],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsSharedModule,
    ...reducers,
    EffectsModule.forFeature(effects)
  ]
})
export class ReportsModule {}
