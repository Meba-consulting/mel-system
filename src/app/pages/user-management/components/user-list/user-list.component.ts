import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as _ from 'lodash';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() users: any[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    'position',
    'firstName',
    'surname',
    'phoneNumber',
    'email',
    'username',
    'action',
  ];
  dataSource: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.users);
    this.dataSource = new MatTableDataSource(this.formatUsersList(this.users));
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatUsersList(users) {
    return _.map(users, (user, index) => {
      return {
        position: index + 1,
        firstName: user?.firstName.toUpperCase(),
        surname: user?.surname.toUpperCase(),
        phoneNumber: user?.phoneNumber ? user?.phoneNumber : '-',
        email: user?.email ? user?.email : '-',
        username: user?.userCredentials?.user?.username,
        action: user,
      };
    });
  }

  onEditUser(e, user) {
    e.stopPropagation();
    console.log(user);
  }

  onAddNewUser(e) {
    e.stopPropagation();
  }
}
