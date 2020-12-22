import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-close-club',
  templateUrl: './close-club.component.html',
  styleUrls: ['./close-club.component.css'],
})
export class CloseClubComponent implements OnInit {
  club: any;
  constructor(
    private dialogRef: MatDialogRef<CloseClubComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.club = data;
  }

  ngOnInit(): void {}

  onConfirmCloseClub(e) {
    e.stopPropagation();
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
