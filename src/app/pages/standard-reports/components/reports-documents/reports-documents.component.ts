import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { getReportsResourcesGroups } from '../../helpers/format-resources-reports.helper';
import { formatResourcesByAccess } from 'src/app/pages/resources/helpers/format-resources-by-access.helper';

@Component({
  selector: 'app-reports-documents',
  templateUrl: './reports-documents.component.html',
  styleUrls: ['./reports-documents.component.css']
})
export class ReportsDocumentsComponent implements OnInit {
  @Input() resources: any;
  @Input() currentUser: any;
  @Input() userGroups: any[];
  reportGroups: any[];
  currentResourceGroup: any;
  isReportSelectionSet: boolean = false;
  reports: any;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.reportGroups = getReportsResourcesGroups(this.currentUser);
    this.currentResourceGroup = this.reportGroups[0];
    this.reports = formatResourcesByAccess(this.reportGroups, this.resources);
    this.isReportSelectionSet = true;
  }
  onSetCurrentResourceGroup(reportGroup) {
    this.currentResourceGroup = reportGroup;
    this.isReportSelectionSet = false;
    setTimeout(() => {
      this.reports = formatResourcesByAccess(this.reportGroups, this.resources);
      this.isReportSelectionSet = true;
    }, 100);
  }
}
