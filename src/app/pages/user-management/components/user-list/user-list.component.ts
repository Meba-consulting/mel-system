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
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DeletingItemComponent } from 'src/app/shared/components/deleting-item/deleting-item.component';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() users: any[];
  @Input() currentUser: any;

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
  userGroupsConfigs$: Observable<any>;
  canDoMaintenance: boolean = false;
  @Output() reLoadUsers = new EventEmitter<any>();
  constructor(
    private dialog: MatDialog,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit(): void {
    // console.log(this.users);
    this.dataSource = new MatTableDataSource(this.formatUsersList(this.users));
    this.dataSource.paginator = this.paginator;
    this.userGroupsConfigs$ = this.httpClient.get(
      'dataStore/user-groups/configurations'
    );

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

  onEditUser(e, user, userGroupsConfigs) {
    e.stopPropagation();
    this.dialog
      .open(AddUserComponent, {
        width: '60%',
        height: '600px',
        disableClose: false,
        data: { userGroupsConfigs: userGroupsConfigs, user: user?.action },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.reLoadUsers.emit(true);
        }
      });
  }

  onAddNewUser(e, userGroupsConfigs) {
    e.stopPropagation();
    this.dialog
      .open(AddUserComponent, {
        width: '60%',
        height: '600px',
        disableClose: false,
        data: { userGroupsConfigs: userGroupsConfigs, user: null },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.reLoadUsers.emit(true);
        }
      });
  }

  onDeleteUser(e, user) {
    e.stopPropagation();
    this.dialog
      .open(DeletingItemComponent, {
        width: '20%',
        height: '200px',
        disableClose: false,
        data: { path: 'users/' + user?.id, itemName: user?.displayName },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.reLoadUsers.emit(true);
        }
      });
  }
}
