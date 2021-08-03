import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as _ from 'lodash';
import { DeletingItemComponent } from 'src/app/shared/components/deleting-item/deleting-item.component';

@Component({
  selector: 'app-user-groups-list',
  templateUrl: './user-groups-list.component.html',
  styleUrls: ['./user-groups-list.component.css'],
})
export class UserGroupsListComponent implements OnInit {
  @Input() userGroups: any[];
  @Input() section: any;
  @Input() currentUser: any;
  items: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'userGroup', 'action'];
  dataSource: any;
  canDoMaintenance: boolean = false;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.items = this.section?.no_underscore
      ? _.filter(this.userGroups, (item) => {
          if (item?.name?.indexOf('_') !== 0) {
            return item;
          }
        }) || []
      : _.filter(this.userGroups, (item) => {
          if (
            item?.name
              ?.toLowerCase()
              .indexOf(this.section?.key.toLowerCase()) == 0
          ) {
            return item;
          }
        }) || [];
    // console.log(this.userGroups);
    // console.log('SECTIOn', this.section);
    this.dataSource = new MatTableDataSource(this.formatUserRoles(this.items));
    this.dataSource.paginator = this.paginator;

    _.each(this.currentUser.userGroups, (userGroup) => {
      if (userGroup.name.indexOf('MAINTENANCE') > -1) {
        this.canDoMaintenance = true;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatUserRoles(userGroups) {
    return _.map(userGroups, (userGroup, index) => {
      return {
        position: index + 1,
        userGroup: userGroup?.name.toUpperCase(),
        action: '',
      };
    });
  }

  onEditUserGroup(e, userGroup) {
    e.stopPropagation();
  }

  onAddNewUserGroup(e) {
    e.stopPropagation();
  }

  onDeleteUserGroup(e, group) {
    e.stopPropagation();
    this.dialog
      .open(DeletingItemComponent, {
        width: '20%',
        height: '150px',
        disableClose: false,
        data: { path: 'userGroups/' + group?.id, itemName: group?.name },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          // this.reLoadUsers.emit(true);
        }
      });
  }
}
