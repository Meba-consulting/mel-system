import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DeleteItemService } from 'src/app/core/services/delete-item.service';

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
  constructor(
    private dialogRef: MatDialogRef<DeletingItemComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private deleteItemService: DeleteItemService
  ) {
    this.deletePath = data?.path;
    this.itemName = data?.itemName;
  }

  ngOnInit(): void {}

  onConfirmDelete(e) {
    e.stopPropagation();
    this.deletingItem = true;
    this.deleteResponse$ = this.deleteItemService.deleteItem(this.deletePath);
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
