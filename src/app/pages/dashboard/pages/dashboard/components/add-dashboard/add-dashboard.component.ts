import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDashboardModalComponent } from '../add-dashboard-modal/add-dashboard-modal.component';

@Component({
  selector: 'app-add-dashboard',
  templateUrl: './add-dashboard.component.html',
  styleUrls: ['./add-dashboard.component.scss'],
})
export class AddDashboardComponent implements OnInit {
  @Input() roundButton: boolean;

  @Output() create: EventEmitter<string> = new EventEmitter<string>();
  showCreateForm: boolean;
  dashboardName: string;
  constructor(private dialog: MatDialog) {
    this.showCreateForm = false;
  }

  get inputSize() {
    return this.dashboardName
      ? this.dashboardName.length > 12
        ? this.dashboardName.length
        : 12
      : 12;
  }

  get dashboardNameIsWhiteSpace() {
    return this.dashboardName
      ? this.dashboardName.trim().length > 1
        ? false
        : true
      : true;
  }

  ngOnInit() {}

  save(e) {
    e.stopPropagation();
    this.create.emit(this.dashboardName);
    this.toggleCreateForm();
  }

  toggleCreateForm(e?) {
    if (e) {
      e.stopPropagation();
    }
    this.dialog
      .open(AddDashboardModalComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((response) => {
        if (response && response?.length > 0) {
          this.create.emit(response);
        }
      });

    // if (this.showCreateForm) {
    //   this.dashboardName = '';
    // }

    // this.showCreateForm = !this.showCreateForm;
  }
}
