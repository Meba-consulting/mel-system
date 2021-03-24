import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OuService } from 'src/app/core/services/ou.service';
import { DeletingItemComponent } from 'src/app/shared/components/deleting-item/deleting-item.component';
import { formatClubsForDatatableList } from '../../helpers';
import { AddClubMemberComponent } from '../add-club-member/add-club-member.component';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';
import { CloseClubComponent } from '../close-club/close-club.component';
import { ClubMembersListComponent } from '../club-members-list/club-members-list.component';
import { DeleteOuComponent } from '../delete-ou/delete-ou.component';
import { FormEntryModalComponent } from '../form-entry-modal/form-entry-modal.component';
import { FormsDataListModalComponent } from '../forms-data-list-modal/forms-data-list-modal.component';

@Component({
  selector: 'app-ou-list',
  templateUrl: './ou-list.component.html',
  styleUrls: ['./ou-list.component.css'],
})
export class OuListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() ous: any;
  @Input() group: any;
  @Input() categories: any;
  @Input() currentUser: any;
  displayedColumns: string[] = [
    'position',
    'region',
    'council',
    'name',
    'status',
    'action',
  ];
  dataSource: any;
  constructor(private dialog: MatDialog, private ouService: OuService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      formatClubsForDatatableList(this.ous)
    );
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // onEditOu(e, ou) {
  //   e.stopPropagation();
  // }

  onEditOu(e, ou) {
    e.stopPropagation();
    this.ouService.getOu(ou?.uuid).subscribe((response) => {
      if (response) {
        // console.log('response', response);
        this.dialog.open(AddClubModalComponent, {
          width: '70%',
          height: '600px',
          disableClose: false,
          data: { clubCategories: this.categories, club: response },
          panelClass: 'custom-dialog-container',
        });
      }
    });
  }

  onAddClubMember(e, club) {
    e.stopPropagation();
    this.dialog.open(AddClubMemberComponent, {
      width: '70%',
      height: '600px',
      disableClose: false,
      data: club,
      panelClass: 'custom-dialog-container',
    });
  }

  onViewProgramData(e, paralegal, programId) {
    this.dialog.open(FormsDataListModalComponent, {
      width: '80%',
      height: '600px',
      disableClose: false,
      data: { ou: paralegal, programId: programId },
      panelClass: 'custom-dialog-container',
    });
  }

  onAddParalegalMembers(e, paralegal, programId) {
    e.stopPropagation();
    this.dialog.open(FormEntryModalComponent, {
      width: '60%',
      height: '600px',
      disableClose: false,
      data: { ou: paralegal, programId: programId },
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

  onCloseClub(e, ou) {
    e.stopPropagation();
    console.log(ou);
    this.dialog.open(CloseClubComponent, {
      width: '25%',
      height: '300px',
      disableClose: false,
      data: ou,
      panelClass: 'custom-dialog-container',
    });
  }

  onDeleteOu(e, ou) {
    e.stopPropagation();
    console.log(ou);
    this.dialog
      .open(DeletingItemComponent, {
        width: '20%',
        height: '200px',
        disableClose: false,
        data: {
          path: 'organisationUnits/' + ou?.id,
          itemName: ou?.action?.name,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe(() => {
        const closed = true;
        // this.dialogClosed.emit(closed);
      });
  }
}
