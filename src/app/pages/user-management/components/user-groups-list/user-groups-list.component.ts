import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as _ from 'lodash';

@Component({
  selector: 'app-user-groups-list',
  templateUrl: './user-groups-list.component.html',
  styleUrls: ['./user-groups-list.component.css'],
})
export class UserGroupsListComponent implements OnInit {
  @Input() userGroups: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'userGroup', 'action'];
  dataSource: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.userGroups);
    this.dataSource = new MatTableDataSource(
      this.formatUserRoles(this.userGroups)
    );
    this.dataSource.paginator = this.paginator;
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
    console.log(userGroup);
  }

  onAddNewUserGroup(e) {
    e.stopPropagation();
  }
}
