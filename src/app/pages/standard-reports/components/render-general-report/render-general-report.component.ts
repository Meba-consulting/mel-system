import { Component, Input, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  onFilterUpdate(selections) {
    console.log(selections);
  }
}
