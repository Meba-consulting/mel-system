import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddYearOfActivityModalComponent } from '../../components/add-year-of-activity-modal/add-year-of-activity-modal.component';

@Component({
  selector: 'app-activity-tracker-dashboard',
  templateUrl: './activity-tracker-dashboard.component.html',
  styleUrls: ['./activity-tracker-dashboard.component.css'],
})
export class ActivityTrackerDashboardComponent implements OnInit {
  @Input() keys: string[];
  selectedTab = new FormControl(0);
  @Output() reloadData = new EventEmitter<any>();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onAddNewActivityYear(e) {
    e.stopPropagation();
    this.dialog
      .open(AddYearOfActivityModalComponent, {
        width: '20%',
        height: '250px',
        disableClose: false,
        data: { availableOptions: this.keys },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.reloadData.emit(true);
        }
      });
  }
}
