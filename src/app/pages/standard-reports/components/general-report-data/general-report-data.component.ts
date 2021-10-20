import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { createDateRanges } from 'src/app/core/helpers/create-date-ranges.helper';
import { GeneralReportsService } from 'src/app/core/services/general-reports.service';

@Component({
  selector: 'app-general-report-data',
  templateUrl: './general-report-data.component.html',
  styleUrls: ['./general-report-data.component.css'],
})
export class GeneralReportDataComponent implements OnInit {
  @Input() program: any;
  @Input() ouAndPeSelections: any;
  @Input() type: string;
  @Input() filterBy: string;
  dimensions: any;
  enrollmentDetails$: Observable<any>;
  dataSetReport$: Observable<any>;
  eventReport$: Observable<any>;
  constructor(private generalReportService: GeneralReportsService) {}

  ngOnInit(): void {
    const dateRanges = createDateRanges(this.ouAndPeSelections?.pe?.id);
    this.dimensions = {
      ou: this.ouAndPeSelections?.ou?.id,
      program: this.program.id,
      ds: this.program?.id,
      startDate: dateRanges?.startDate,
      endDate: dateRanges?.endDate,
      pe: this.ouAndPeSelections?.pe?.id,
      elementsDimensions: [],
    };
    if (this.type === 'TRACKER') {
      this.enrollmentDetails$ =
        this.generalReportService.getEnrollmentDetailsFromSQLView(
          this.dimensions
        );
    } else if (this.type === 'EVENT') {
      const elementsDimensions =
        this.program?.programStages[0]?.programStageDataElements.map(
          (programStageDataElement) => {
            return (
              this.program?.programStages[0]?.id +
              '.' +
              programStageDataElement?.dataElement?.id
            );
          }
        );
      this.dimensions['elementsDimensions'] = elementsDimensions;
      this.eventReport$ = this.generalReportService.getEventsData(
        this.dimensions
      );
    } else {
      this.dataSetReport$ = this.generalReportService.getDataSetReport(
        this.dimensions
      );
    }
  }
}
