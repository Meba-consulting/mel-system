import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { sanitizeGeneralReportFromTrackedEntityInstancesAndAssociatedEvents } from 'src/app/core/helpers/sanitize-general-program-report.helper';
import { RenderTrackerGeneralReportModalComponent } from '../render-tracker-general-report-modal/render-tracker-general-report-modal.component';

@Component({
  selector: 'app-render-tracker-general-report',
  templateUrl: './render-tracker-general-report.component.html',
  styleUrls: ['./render-tracker-general-report.component.css'],
})
export class RenderTrackerGeneralReportComponent implements OnInit {
  @Input() programData: any;
  @Input() program: any;
  @Input() filterBy: string;
  formattedData: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formattedData =
      sanitizeGeneralReportFromTrackedEntityInstancesAndAssociatedEvents(
        this.program,
        this.programData,
        this.filterBy
      );

    // console.log('formattedData', this.formattedData);
    // console.log(this.program);
  }

  viewCustomReport(event: Event, data, program) {
    event.stopPropagation();
    this.dialog.open(RenderTrackerGeneralReportModalComponent, {
      width: '75%',
      height: '85vh',
      data: { data, program },
    });
  }

  viewAllAsOneReport(event: Event, allData, program) {
    event.stopPropagation();
    this.dialog.open(RenderTrackerGeneralReportModalComponent, {
      width: '75%',
      height: '85vh',
      data: { data: allData, isAllData: true, program },
    });
  }
}
