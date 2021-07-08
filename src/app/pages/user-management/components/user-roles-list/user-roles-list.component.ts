import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as _ from 'lodash';

@Component({
  selector: 'app-user-roles-list',
  templateUrl: './user-roles-list.component.html',
  styleUrls: ['./user-roles-list.component.css'],
})
export class UserRolesListComponent implements OnInit {
  @Input() userRoles: any[];
  @Input() currentUser: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'userRole', 'action'];
  dataSource: any;
  canDoMaintenance: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log(this.userRoles);
    this.dataSource = new MatTableDataSource(
      this.formatUserRoles(this.userRoles)
    );
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

  formatUserRoles(userRoles) {
    return _.map(userRoles, (userRole, index) => {
      return {
        position: index + 1,
        userRole: userRole?.name.toUpperCase(),
        action: '',
      };
    });
  }

  onEditUserRole(e, userRole) {
    e.stopPropagation();
    console.log(userRole);
  }

  onAddNewUserRole(e) {
    e.stopPropagation();
  }
}
