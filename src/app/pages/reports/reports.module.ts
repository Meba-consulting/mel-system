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

@NgModule({
  declarations: [...pages, RenderReportComponent],
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
