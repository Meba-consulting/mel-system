import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { ReportComponent } from './components/report/report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RenderReportComponent } from './components/render-report/render-report.component';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from 'src/app/core/pipes';
import { StandardReportRoutingModule } from './standard-reports-routing.module';
import { ReportGroupsComponent } from './components/report-groups/report-groups.component';

@NgModule({
  declarations: [
    HomeComponent,
    ReportsListComponent,
    ReportComponent,
    RenderReportComponent,
    FilterByNamePipe,
    ReportGroupsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StandardReportRoutingModule,
    ...reducers,
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  providers: []
})
export class StandardReportsModule {}
