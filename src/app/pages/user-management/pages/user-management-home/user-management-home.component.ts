import { Component, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentUser, State } from 'src/app/store';

@Component({
  selector: 'app-user-management-home',
  templateUrl: './user-management-home.component.html',
  styleUrls: ['./user-management-home.component.css'],
})
export class UserManagementHomeComponent implements OnInit {
  userGroupsConfigs$: Observable<any>;
  currentUser$: Observable<any>;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.userGroupsConfigs$ = this.httpClient.get(
      'dataStore/user-groups/configurations'
    );
  }
}
