import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-download-file-resource',
  templateUrl: './download-file-resource.component.html',
  styleUrls: ['./download-file-resource.component.css'],
})
export class DownloadFileResourceComponent implements OnInit {
  data: any;
  constructor(
    private dialogRef: MatDialogRef<DownloadFileResourceComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.data = data;
  }

  ngOnInit(): void {}

  onDownloadResource(event: Event, data) {
    event.stopPropagation();
    window.open(
      '../../../api/events/files?dataElementUid=' +
        data.dataElement +
        '&eventUid=' +
        data.event
    );
  }

  onCancel(event: Event) {
    event.stopPropagation();
    this.dialogRef.close();
  }
}
