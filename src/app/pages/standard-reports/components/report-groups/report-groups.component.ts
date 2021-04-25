import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getReportGroups } from '../../helpers/format-list-of-reports-for-datatable.helper';

@Component({
  selector: 'app-report-groups',
  templateUrl: './report-groups.component.html',
  styleUrls: ['./report-groups.component.css'],
})
export class ReportGroupsComponent implements OnInit {
  @Input() currentUser: any;
  @Input() type: string;
  reportGroups: Array<any>;
  currentGroup: any;
  @Output() selectedReportGroup: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.reportGroups = getReportGroups(this.currentUser.userGroups, this.type);
    this.currentGroup = this.reportGroups[0];
    this.selectedReportGroup.emit(this.reportGroups[0]);
  }

  onSetCurrentGroup(reportGroup) {
    this.currentGroup = reportGroup;
    this.selectedReportGroup.emit(reportGroup);
  }
}
