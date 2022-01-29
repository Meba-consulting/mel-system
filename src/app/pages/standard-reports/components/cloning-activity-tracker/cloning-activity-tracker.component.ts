import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivityTrackerService } from '../../services/activity-tracker.service';

@Component({
  selector: 'app-cloning-activity-tracker',
  templateUrl: './cloning-activity-tracker.component.html',
  styleUrls: ['./cloning-activity-tracker.component.css'],
})
export class CloningActivityTrackerComponent implements OnInit {
  dialogData: any;
  options: string[];
  activityDetails$: Observable<any>;
  selectedValue: any;
  availableOptions: any = {};
  savingData: boolean = false;
  savedSuccefully: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<CloningActivityTrackerComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private activityService: ActivityTrackerService
  ) {
    this.dialogData = data;
  }

  ngOnInit(): void {
    this.savingData = false;
    this.activityDetails$ = this.activityService.getActivityDetailsByKey(
      this.dialogData?.key
    );
    this.dialogData?.keys.forEach((key) => {
      this.availableOptions[key] = key;
    });

    let currentYear = new Date().getFullYear();
    this.options = [];
    for (let count = 0; count < 2; count++) {
      this.options.push((currentYear + count).toString());
    }
  }

  onSave(event: Event, data: any, key: string): void {
    event.stopPropagation();
    this.savingData = true;
    this.activityService
      .createActivityYearWithDetails(key, data)
      .subscribe((response) => {
        if (response) {
          this.savingData = false;
          this.savedSuccefully = true;
        }
      });
  }

  onClose(event: Event): void {
    event.stopPropagation();
    this.dialogRef.close(true);
  }
}
