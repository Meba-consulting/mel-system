import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

@Component({
  selector: 'app-add-year-of-activity-modal',
  templateUrl: './add-year-of-activity-modal.component.html',
  styleUrls: ['./add-year-of-activity-modal.component.css'],
})
export class AddYearOfActivityModalComponent implements OnInit {
  options: string[];
  selectedValue: string;
  addedNew: boolean = false;
  availableOptions: any = {};
  savingActivityTrackerYear: boolean = false;
  message: string = '';
  constructor(
    private dialogRef: MatDialogRef<AddYearOfActivityModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private activityService: ActivityTrackerService
  ) {
    data?.availableOptions.forEach((year) => {
      this.availableOptions[year] = year;
    });
  }

  ngOnInit(): void {
    let currentYear = new Date().getFullYear();
    this.options = [];
    for (let count = 0; count < 2; count++) {
      this.options.push((currentYear + count).toString());
    }
  }

  onSave(e) {
    e.stopPropagation();
    this.savingActivityTrackerYear = true;
    this.message = 'Saving data';
    this.activityService
      .createActivityYear(this.selectedValue)
      .subscribe((res) => {
        if (res) {
          this.savingActivityTrackerYear = false;
          this.addedNew = true;
          this.message = 'Saved successfully';
          setTimeout(() => {
            this.message = '';
          }, 1000);
        }
      });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.addedNew);
  }
}
