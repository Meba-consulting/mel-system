import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralReportsService } from 'src/app/core/services/general-reports.service';

@Component({
  selector: 'app-general-report-custom',
  templateUrl: './general-report-custom.component.html',
  styleUrls: ['./general-report-custom.component.css'],
})
export class GeneralReportCustomComponent implements OnInit {
  @Input() enrollmentDetails: any;
  @Input() program: any;
  programData$: Observable<any>;
  constructor(private generalReportService: GeneralReportsService) {}

  ngOnInit(): void {
    console.log(this.enrollmentDetails);
    const headers = this.enrollmentDetails.headers;
    const trackedentityinstanceHeaderIndex = (headers
      .map((dataHeader, index) => {
        return { ...dataHeader, index };
      })
      .filter((header) => header.name === 'trackedentityinstance') || [])[0]
      ?.index;

    this.generalReportService
      .getAllTrackedEntityInstancesDetails(
        this.enrollmentDetails.rows,
        trackedentityinstanceHeaderIndex
      )
      .subscribe((response) => {
        console.log(response);
        if (response) {
          this.programData$ =
            this.generalReportService.getAllEventsByTrackedEntityInstances(
              response
            );
        }
      });
  }
}
