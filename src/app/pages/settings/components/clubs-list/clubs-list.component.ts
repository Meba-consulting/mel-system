import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OuService } from 'src/app/core/services/ou.service';
import { formatClubsForDatatableList } from '../../helpers';
import { AddClubMemberComponent } from '../add-club-member/add-club-member.component';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';
import { CloseClubComponent } from '../close-club/close-club.component';
import { ClubMembersListComponent } from '../club-members-list/club-members-list.component';
import { DeleteOuComponent } from '../delete-ou/delete-ou.component';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.css'],
})
export class ClubsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() clubs: any[];
  @Input() clubCategories: any;
  @Output() dialogClosed = new EventEmitter<any>();
  displayedColumns: string[] = [
    'position',
    'region',
    'council',
    'name',
    'action',
  ];
  dataSource: any;
  constructor(private dialog: MatDialog, private ouService: OuService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatClubsForDatatableList(this.clubs)
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditClubInfo(e, club) {
    e.stopPropagation();
    this.ouService.getOu(club?.uuid).subscribe((response) => {
      if (response) {
        // console.log('response', response);
        this.dialog.open(AddClubModalComponent, {
          width: '50%',
          height: '680px',
          disableClose: false,
          data: { clubCategories: this.clubCategories, club: response },
          panelClass: 'custom-dialog-container',
        });
      }
    });
  }

  onAddClubMember(e, club) {
    e.stopPropagation();
    this.dialog.open(AddClubMemberComponent, {
      width: '50%',
      height: '680px',
      disableClose: false,
      data: club,
      panelClass: 'custom-dialog-container',
    });
  }

  onViewClubMembers(e, club) {
    e.stopPropagation();
    this.dialog.open(ClubMembersListComponent, {
      width: '70%',
      height: '600px',
      disableClose: false,
      data: club,
      panelClass: 'custom-dialog-container',
    });
  }

  onCloseClub(e, club) {
    e.stopPropagation();
    console.log(club);
    this.dialog.open(CloseClubComponent, {
      width: '25%',
      height: '200px',
      disableClose: false,
      data: club,
      panelClass: 'custom-dialog-container',
    });
  }

  onDeleteClub(e, club) {
    e.stopPropagation();
    console.log(club);
    this.dialog
      .open(DeleteOuComponent, {
        width: '25%',
        height: '200px',
        disableClose: false,
        data: club,
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe(() => {
        const closed = true;
        this.dialogClosed.emit(closed);
      });
  }
}
