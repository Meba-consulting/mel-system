import { Component, Input, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/user.service';
import { getCurrentUser, State } from 'src/app/store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$: Observable<any[]>;
  @Input() currentUser: any;
  userGroupsConfigs$: Observable<any>;
  constructor(
    private userService: UsersService,
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.loadUsers();
    this.userGroupsConfigs$ = this.httpClient.get(
      'dataStore/user-groups/configurations'
    );
  }

  onReloadUsers(e) {
    this.users$ = this.userService.loadUsers();
  }
}
