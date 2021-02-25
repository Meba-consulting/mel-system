import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

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
  constructor(
    private dialogRef: MatDialogRef<DeletingItemComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.deletePath = data?.path;
    this.itemName = data?.itemName;
  }

  ngOnInit(): void {}

  onConfirmDelete(e) {
    e.stopPropagation();
    this.deletingItem = true;
    this.httpClient.delete(this.deletePath).subscribe((response: any) => {
      if (response) {
        this.message = response?.status;
        this.deletingItem = false;
        this.deletedItem = true;
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
