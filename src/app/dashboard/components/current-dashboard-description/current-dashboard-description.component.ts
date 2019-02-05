import { Component, OnInit, Input } from '@angular/core';
import { getDataSelectionSummary } from 'src/app/helpers/get-data-selection-summary.helper';

@Component({
  selector: 'app-current-dashboard-description',
  templateUrl: './current-dashboard-description.component.html',
  styleUrls: ['./current-dashboard-description.component.scss']
})
export class CurrentDashboardDescriptionComponent implements OnInit {
  @Input() dashboardDescription: string;
  @Input()
  globalSelections: any;
  @Input() dashboardId: string;
  constructor() {}

  get globalSelectionSummary(): string {
    return getDataSelectionSummary(this.globalSelections);
  }

  ngOnInit() {}
}
