import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-program-modal',
  templateUrl: './add-program-modal.component.html',
  styleUrls: ['./add-program-modal.component.css'],
})
export class AddProgramModalComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AddProgramModalComponent>) {}

  ngOnInit(): void {}

  onClose(e): void {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
