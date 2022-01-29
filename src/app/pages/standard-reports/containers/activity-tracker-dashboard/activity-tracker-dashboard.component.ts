import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddYearOfActivityModalComponent } from '../../components/add-year-of-activity-modal/add-year-of-activity-modal.component';
import { CloningActivityTrackerComponent } from '../../components/cloning-activity-tracker/cloning-activity-tracker.component';

@Component({
  selector: 'app-activity-tracker-dashboard',
  templateUrl: './activity-tracker-dashboard.component.html',
  styleUrls: ['./activity-tracker-dashboard.component.css'],
})
export class ActivityTrackerDashboardComponent implements OnInit {
  @Input() keys: string[];
  @Input() indicators: any[];
  selectedTab = new FormControl(0);
  @Output() reloadData = new EventEmitter<any>();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onAddNewActivityYear(e) {
    e.stopPropagation();
    this.dialog
      .open(AddYearOfActivityModalComponent, {
        width: '20%',
        height: '180px',
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

  onOpenClone(event: Event, key: string, keys: string[]): void {
    this.dialog
      .open(CloningActivityTrackerComponent, {
        width: '30%',
        data: { key, keys },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.reloadData.emit(true);
        }
      });
  }
}
