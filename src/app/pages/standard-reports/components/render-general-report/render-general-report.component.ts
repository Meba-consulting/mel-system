import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralReportsService } from 'src/app/core/services/general-reports.service';

@Component({
  selector: 'app-render-general-report',
  templateUrl: './render-general-report.component.html',
  styleUrls: ['./render-general-report.component.css'],
})
export class RenderGeneralReportComponent implements OnInit {
  @Input() reportId: string;
  @Input() type: string;
  @Input() program: any;
  selectionChanged: boolean = false;
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: true,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showUserOrgUnitSection: false,
      showOrgUnitLevelGroupSection: false,
      showOrgUnitGroupSection: false,
      showOrgUnitLevelSection: false,
      reportUse: false,
      additionalQueryFields: [],
      batchSize: 400,
    },
    periodFilterConfig: {
      singleSelection: false,
    },
  };
  selectedOrgUnitItems: Array<any> = [];
  programConfigs$: Observable<any>;
  dataSelections: any;
  shouldRenderReport: boolean = false;
  constructor(private generalReportService: GeneralReportsService) {}

  ngOnInit(): void {
    this.programConfigs$ =
      this.generalReportService.getGeneralReportDataStoreConfigs(this.program);
  }

  onFilterUpdate(selections) {
    this.dataSelections = {};
    selections.map((selection) => {
      this.shouldRenderReport = false;
      this.dataSelections[selection?.dimension] = selection?.items[0];
    });
    setTimeout(() => {
      if (Object.keys(this.dataSelections).length > 1) {
        this.shouldRenderReport = true;
      }
    }, 500);
  }

  printPDF() {
    setTimeout(function () {
      window.print();
    }, 500);
  }
}
