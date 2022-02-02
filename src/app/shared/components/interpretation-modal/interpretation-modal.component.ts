import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-interpretation-modal',
  templateUrl: './interpretation-modal.component.html',
  styleUrls: ['./interpretation-modal.component.css'],
})
export class InterpretationModalComponent implements OnInit {
  parameters: any;
  dialogData: any;
  sending: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<InterpretationModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogData = data;
  }

  ngOnInit(): void {}
}
