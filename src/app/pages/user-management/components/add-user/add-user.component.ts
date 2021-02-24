import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/core/services/user.service';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { getAllUserGroups, State } from 'src/app/store';

import { map } from 'lodash';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  formFields: any[] = [];
  currentFormData: any = {};
  usernameField: any[];
  usedUsername$: Observable<any>;
  startCheckingUsername: boolean = false;
  isFormValid: boolean = false;
  userRoles$: Observable<any[]>;
  userGroups$: Observable<any[]>;
  userGroupsConfigs: any[];
  selectedUserGroups: any[] = [];
  selectedUserRoles: any[] = [];
  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private httpClient: NgxDhis2HttpClientService,
    private usersService: UsersService,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.userGroupsConfigs = data;
  }

  ngOnInit(): void {
    this.usernameField = [
      {
        id: 'username',
        label: 'Username',
        key: 'username',
        required: true,
        controlType: 'username',
        type: 'text',
      },
    ];

    this.formFields = [
      ...this.formFields,
      {
        id: 'email',
        label: 'Email',
        key: 'email',
        required: true,
        controlType: 'email',
        type: 'text',
      },
      {
        id: 'password',
        label: 'Password',
        key: 'password',
        required: true,
        controlType: 'password',
        type: 'text',
      },
      {
        id: 're-password',
        label: 'Repeat password',
        key: 're-password',
        required: true,
        controlType: 'password',
        type: 'text',
      },
      {
        id: 'phoneNumber',
        label: 'Phone number',
        key: 'phoneNumber',
        required: true,
        placeholder: '766460759',
        max: 9,
        controlType: 'phoneNumber',
        type: 'text',
      },
    ];

    this.userRoles$ = this.usersService.loadUserRoles();
    this.userGroups$ = this.store.select(getAllUserGroups);
  }

  onUserUpdate(e: FormValue) {
    this.startCheckingUsername = false;
    const username = e.getValues()?.username?.value;
    console.log(e.getValues());
    this.currentFormData['username'] = {
      id: 'username',
      value: username,
    };
    if (username?.length > 3) {
      this.startCheckingUsername = true;
      this.usedUsername$ = this.httpClient.get(
        'users?filter=userCredentials.username:eq:' + username + '&fields=id'
      );

      this.usedUsername$.subscribe((response) => {
        if (response && response?.users?.length > 0) {
          this.usernameField = [
            {
              id: 'username',
              label: 'Username',
              key: 'username',
              required: true,
              controlType: 'username',
              type: 'text',
              hint: 'Username already taken',
            },
          ];
        } else if (response && response?.users?.length == 0) {
          this.usernameField = [
            {
              id: 'username',
              label: 'Username',
              key: 'username',
              required: true,
              controlType: 'username',
              type: 'text',
            },
          ];
        }
      });
    }
    // e.getValues
  }

  onFormUpdate(formValue: FormValue) {
    console.log(formValue.getValues());
    this.isFormValid = formValue.isValid;
  }

  onSave(e) {
    e.stopPropagation();
  }

  onGetSelectedItems(items, type) {
    console.log(items);
    console.log(type);
    if (type == 'ROLES') {
      this.selectedUserRoles = map(items, (item) => {
        return item?.id;
      });
    } else {
      this.selectedUserGroups = [...this.selectedUserGroups];
    }
  }
}
