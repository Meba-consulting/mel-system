import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DeleteItemService } from 'src/app/core/services/delete-item.service';
import { ActivityTrackerService } from 'src/app/pages/standard-reports/services/activity-tracker.service';

@Component({
  selector: 'app-deleting-item',
  templateUrl: './deleting-item.component.html',
  styleUrls: ['./deleting-item.component.css'],
})
export class DeletingItemComponent implements OnInit {
  deletePath: string;
  itemName: string;
  message: string;
  deletedItem: boolean = false;
  deletingItem: boolean = false;
  deleteResponse$: Observable<any>;
  data: any;
  dialogCloseData: any;
  constructor(
    private dialogRef: MatDialogRef<DeletingItemComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private deleteItemService: DeleteItemService,
    private activityTrackerService: ActivityTrackerService
  ) {
    this.deletePath = data?.path;
    this.itemName = data?.itemName;
    this.data = data;
    this.deletedItem = false;
  }

  ngOnInit(): void {}

  onConfirmDelete(e: Event): void {
    e.stopPropagation();
    this.deletingItem = true;
    if (!this.data?.dataStore) {
      this.deleteResponse$ = this.deleteItemService.deleteItem(this.deletePath);
    } else {
      this.deleteResponse$ =
        this.activityTrackerService.saveActivityTrackerDetails(
          this.data?.path,
          this.data?.data
        );
    }

    this.deleteResponse$.subscribe((response) => {
      if (response) {
        setTimeout(() => {
          this.deletingItem = false;
          if (response.status === 'OK') {
            this.deletedItem = true;
          }
        }, 2000);
      }
    });
  }

  onClose(e) {
    e.stopPropagation();
    if (this.deletedItem) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(null);
    }
  }
}
