import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-confirm-delete-event',
  templateUrl: './confirm-delete-event.component.html',
  styleUrls: ['./confirm-delete-event.component.css'],
})
export class ConfirmDeleteEventComponent implements OnInit {
  event: any;
  message: string;
  deleting: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService
  ) {
    this.event = data;
  }
  ngOnInit(): void {}

  onConfirmDelete(e, event) {
    e.stopPropagation();
    this.deleting = true;
    this.dataService.deleteEvent(event?.event).subscribe((response) => {
      if (response) {
        this.message = response?.status;
        this.deleting = false;
        console.log('message', this.message);
      }
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
