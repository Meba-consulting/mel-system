import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-aggregate-data-modal',
  templateUrl: './upload-aggregate-data-modal.component.html',
  styleUrls: ['./upload-aggregate-data-modal.component.css'],
})
export class UploadAggregateDataModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<UploadAggregateDataModalComponent>
  ) {}

  ngOnInit(): void {}

  onClose(event) {
    event.stopPropagation();
    this.dialogRef.close();
  }
}
