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
import { UploadedReportsComponent } from './containers/uploaded-reports/uploaded-reports.component';
import { ReportsDocumentsComponent } from './components/reports-documents/reports-documents.component';
import { ReportDcComponent } from './components/report-dc/report-dc.component';
import { UploadedReportsListComponent } from './components/uploaded-reports-list/uploaded-reports-list.component';
import { FilterUsingInputPipe } from './pipes/filter-using-input.pipe';
import { UploadNewReportComponent } from './containers/upload-new-report/upload-new-report.component';
import { ReportFormComponent } from './components/report-form/report-form.component';
import { UploadReportComponent } from './components/upload-report/upload-report.component';
import { ActivityTrackerComponent } from './containers/activity-tracker/activity-tracker.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { ActivityTrackerDashboardComponent } from './containers/activity-tracker-dashboard/activity-tracker-dashboard.component';
import { AddYearOfActivityModalComponent } from './components/add-year-of-activity-modal/add-year-of-activity-modal.component';
import { StrategicObjectivesListComponent } from './components/strategic-objectives-list/strategic-objectives-list.component';
import { OutputModalComponent } from './components/output-modal/output-modal.component';
import { TargetsSettingsComponent } from './components/targets-settings/targets-settings.component';

@NgModule({
  declarations: [
    HomeComponent,
    ReportsListComponent,
    ReportComponent,
    RenderReportComponent,
    FilterByNamePipe,
    ReportGroupsComponent,
    UploadedReportsComponent,
    ReportsDocumentsComponent,
    ReportDcComponent,
    UploadedReportsListComponent,
    FilterUsingInputPipe,
    UploadNewReportComponent,
    ReportFormComponent,
    UploadReportComponent,
    ActivityTrackerComponent,
    AddActivityComponent,
    ActivityTrackerDashboardComponent,
    AddYearOfActivityModalComponent,
    StrategicObjectivesListComponent,
    OutputModalComponent,
    TargetsSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StandardReportRoutingModule,
    ...reducers,
    EffectsModule.forFeature(effects),
    SharedModule,
  ],
  providers: [],
  entryComponents: [
    UploadReportComponent,
    AddActivityComponent,
    AddYearOfActivityModalComponent,
    OutputModalComponent,
    TargetsSettingsComponent,
  ],
})
export class StandardReportsModule {}
