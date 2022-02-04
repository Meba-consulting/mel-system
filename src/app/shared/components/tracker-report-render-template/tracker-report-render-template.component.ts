import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralReportsService } from 'src/app/core/services/general-reports.service';

@Component({
  selector: 'app-tracker-report-render-template',
  templateUrl: './tracker-report-render-template.component.html',
  styleUrls: ['./tracker-report-render-template.component.css'],
})
export class TrackerReportRenderTemplateComponent implements OnInit {
  @Input() program: any;
  @Input() parameters: any;
  @Input() data: any;
  @Input() showOnlyReport: boolean;
  availableReports$: Observable<any>;
  savingEventReport: boolean = false;
  constructor(private generalService: GeneralReportsService) {}

  ngOnInit(): void {
    this.getSaveEventsReports();
  }

  getSaveEventsReports(): void {
    const q =
      this.program?.name +
      '_' +
      this.parameters?.pe?.id +
      '_' +
      this.parameters?.ou?.id +
      '_' +
      this.data?.events[0]?.enrollment;
    this.availableReports$ = this.generalService.getSavedEventReports(q);
  }

  onSaveTheReport(
    event: Event,
    report: any,
    parameters: any,
    program: any
  ): void {
    event.stopPropagation();
    this.savingEventReport = true;
    const dataToSave = {
      columns: [
        {
          dimension: 'pe',
          items: [
            {
              id: parameters?.pe?.id,
            },
          ],
        },
        {
          dimension: 'ou',
          items: [
            {
              id: parameters?.ou?.id,
            },
          ],
        },
        {
          dimension:
            program?.programTrackedEntityAttributes[0]?.trackedEntityAttribute
              ?.id,
          items: [],
          programStage: {
            id: program?.programStages[0]?.id,
          },
          name:
            '[PA] ' +
            program?.programTrackedEntityAttributes[0]?.trackedEntityAttribute
              ?.name,
        },
      ],
      rows: null,
      filters: null,
      name:
        program?.name +
        '_' +
        parameters?.pe?.id +
        '_' +
        parameters?.ou?.id +
        '_' +
        report?.events[0]?.enrollment +
        ':' +
        report?.events[0]?.trackedEntityInstance +
        ':' +
        report?.events[0]?.enrollment,
      favorite: false,
      subscribed: false,
      description: JSON.stringify(report),
      program: {
        id: program?.id,
        name: program?.name,
        enrollmentDateLabel: '',
        incidentDateLabel: '',
      },
      programStage: program?.programStages[0],
      dataType: 'EVENTS',
      showDimensionLabels: true,
      showDataItemPrefix: true,
      hideEmptyRows: false,
      hideNaData: false,
      collapseDataDimensions: false,
      outputType: 'EVENT',
      topLimit: 0,
      sortOrder: 0,
      completedOnly: false,
      showHierarchy: false,
      displayDensity: 'NORMAL',
      fontSize: 'NORMAL',
      digitGroupSeparator: 'SPACE',
      legendSet: null,
      paging: {
        page: 1,
        pageSize: 100,
      },
      rowTotals: false,
      colTotals: true,
      rowSubTotals: false,
      colSubTotals: true,
      reportParams: {
        paramReportingPeriod: false,
        paramOrganisationUnit: false,
        paramParentOrganisationUnit: false,
      },
    };

    this.generalService.saveEventReport(dataToSave).subscribe((response) => {
      if (response) {
        this.savingEventReport = false;
        this.getSaveEventsReports();
      }
    });
  }
}
