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
  dimensions: any;
  enrollmentDetails$: Observable<any>;
  constructor(private generalReportService: GeneralReportsService) {}

  ngOnInit(): void {
    const dateRanges = createDateRanges(this.ouAndPeSelections?.pe?.id);
    this.dimensions = {
      ou: this.ouAndPeSelections?.ou?.id,
      program: this.program.id,
      startDate: dateRanges?.startDate,
      endDate: dateRanges?.endDate,
    };
    this.enrollmentDetails$ =
      this.generalReportService.getEnrollmentDetailsFromSQLView(
        this.dimensions
      );
    console.log('dimensions', this.dimensions);
  }
}
