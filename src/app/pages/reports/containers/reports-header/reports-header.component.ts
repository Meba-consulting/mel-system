import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reports-header',
  templateUrl: './reports-header.component.html',
  styleUrls: ['./reports-header.component.scss']
})
export class ReportsHeaderComponent implements OnInit {
  @Input() reportsGroups: any;
  activeReportGroupId: string;
  @Output() selectedReportGroup = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    if (this.reportsGroups && this.reportsGroups.length > 0) {
      this.activeReportGroupId = this.reportsGroups[0]['id'];
    }
  }

  onSetActiveReportGroup(reportGroup) {
    this.activeReportGroupId = reportGroup.id;
    this.selectedReportGroup.emit(reportGroup);
  }
}
