import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css'],
})
export class ConfirmDeleteModalComponent implements OnInit {
  message: string = '';
  item: string = '';
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.message = data?.message;
    this.item = data?.item;
  }

  ngOnInit(): void {}

  onConfirm(e) {
    e.stopPropagation();
    this.dialogRef.close(true);
  }

  onCancel(e) {
    e.stopPropagation();
    this.dialogRef.close(false);
  }
}
