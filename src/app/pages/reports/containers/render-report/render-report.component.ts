import { Component, OnInit, Input } from '@angular/core';
import { processAnalyticsData } from '../../helpers/reports.helpers';

@Component({
  selector: 'app-render-report',
  templateUrl: './render-report.component.html',
  styleUrls: ['./render-report.component.css']
})
export class RenderReportComponent implements OnInit {
  @Input() reportEntities: any;
  @Input() reportDimensions: any;
  @Input() selectedOus: any;
  constructor() {}

  ngOnInit() {
    if (this.reportEntities) {
      processAnalyticsData(
        this.reportEntities,
        this.reportDimensions,
        this.selectedOus
      );
    }
  }
}
