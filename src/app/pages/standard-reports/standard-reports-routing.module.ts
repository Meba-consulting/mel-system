import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { UploadedReportsComponent } from './containers/uploaded-reports/uploaded-reports.component';
import { ReportsDocumentsComponent } from './components/reports-documents/reports-documents.component';
import { ReportDcComponent } from './components/report-dc/report-dc.component';
import { UploadNewReportComponent } from './containers/upload-new-report/upload-new-report.component';
import { GeneralReportHomeComponent } from './containers/general-report-home/general-report-home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':type/:id',
    component: ReportComponent,
  },
  {
    path: 'upload-new-report/:usergroupId/new/uploaded',
    component: UploadNewReportComponent,
  },
  {
    path: 'general/:type/:id',
    component: GeneralReportHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandardReportRoutingModule {}
