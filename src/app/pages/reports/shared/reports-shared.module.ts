import { NgModule } from '@angular/core';
import { CustomStandardReportsModule } from './custom-standard-reports/custom-standard-reports.module';

@NgModule({
  imports: [CustomStandardReportsModule],
  exports: [CustomStandardReportsModule]
})
export class ReportsSharedModule {}
