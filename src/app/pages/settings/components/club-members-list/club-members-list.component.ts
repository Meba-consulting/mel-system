import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { State } from 'src/app/store';

@Component({
  selector: 'app-club-members-list',
  templateUrl: './club-members-list.component.html',
  styleUrls: ['./club-members-list.component.css'],
})
export class ClubMembersListComponent implements OnInit {
  @Input() orgUnit: any;
  club: any;
  programId: string = 'xZXKsYVQZAf';
  clubMembers$: Observable<any>;
  constructor(
    private dialogRef: MatDialogRef<ClubMembersListComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<State>,
    private dataService: DataService
  ) {
    this.club = data ? data : this.orgUnit;
  }

  ngOnInit(): void {
    this.clubMembers$ = this.dataService.getRegisteredMembers({
      orgUnit: this.club?.uuid,
      program: this.programId,
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
