import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { State } from 'src/app/store';

@Component({
  selector: 'app-forms-data-list-modal',
  templateUrl: './forms-data-list-modal.component.html',
  styleUrls: ['./forms-data-list-modal.component.css'],
})
export class FormsDataListModalComponent implements OnInit {
  ou: any;
  programId: string;
  items$: Observable<any>;
  constructor(
    private dialogRef: MatDialogRef<FormsDataListModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<State>,
    private dataService: DataService
  ) {
    this.ou = data?.ou;
    this.programId = data?.programId;
  }

  ngOnInit(): void {
    this.items$ = this.dataService.getRegisteredMembers({
      orgUnit: this.ou?.uid,
      program: this.programId,
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
