import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OuService } from 'src/app/core/services/ou.service';

@Component({
  selector: 'app-delete-ou',
  templateUrl: './delete-ou.component.html',
  styleUrls: ['./delete-ou.component.css'],
})
export class DeleteOuComponent implements OnInit {
  club: any;
  message: any;
  constructor(
    private dialogRef: MatDialogRef<DeleteOuComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private ouService: OuService
  ) {
    this.club = data;
  }
  ngOnInit(): void {}

  onConfirmDelete(e, club) {
    e.stopPropagation();
    this.ouService.deleteOu(club?.uuid).subscribe((response) => {
      if (response) {
        this.message = response?.status;
      }
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
