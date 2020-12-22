import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatClubsForDatatableList } from '../../helpers';
import { AddClubMemberComponent } from '../add-club-member/add-club-member.component';
import { CloseClubComponent } from '../close-club/close-club.component';
import { ClubMembersListComponent } from '../club-members-list/club-members-list.component';

@Component({
  selector: 'app-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.css'],
})
export class ClubsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() clubs: any[];
  displayedColumns: string[] = [
    'position',
    'region',
    'council',
    'name',
    'action',
  ];
  dataSource: any;
  constructor(private dialog: MatDialog) {}

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
    console.log(club);
  }

  onAddClubMember(e, club) {
    e.stopPropagation();
    this.dialog.open(AddClubMemberComponent, {
      width: '70%',
      height: '700px',
      disableClose: false,
      data: club,
      panelClass: 'custom-dialog-container',
    });
  }

  onViewClubMembers(e, club) {
    e.stopPropagation();
    this.dialog.open(ClubMembersListComponent, {
      width: '80%',
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
}
