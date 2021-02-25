import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UsersService } from 'src/app/core/services/user.service';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';
import { getAllUserGroups, State } from 'src/app/store';

import { map } from 'lodash';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

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

  username: any;

  formattedFormValuesObject: any = {};

  passwordMessage: string = '';

  orgUnitFilterConfig: any = {
    singleSelection: false,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
  selectedOrgUnits: Array<any> = [];

  ouFilterIsSet: boolean = false;

  saveUserResponse$: Observable<any>;

  passwordsMatch: boolean = false;
  savingUser: boolean = false;
  savingUserMessage: string = '';
  atLeastOneUSerAdded: boolean = false;
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
      {
        id: 'firstname',
        label: 'Firstname',
        key: 'firstname',
        required: true,
        controlType: 'textbox',
        type: 'text',
      },
      {
        id: 'surname',
        label: 'Surname',
        key: 'surname',
        required: true,
        controlType: 'textbox',
        type: 'text',
      },
      {
        id: 'password',
        label: 'Password',
        key: 'password',
        required: true,
        controlType: 'password',
        type: 'password',
      },
      {
        id: 'rePassword',
        label: 'Repeat password',
        key: 'rePassword',
        required: true,
        controlType: 'rePassword',
        type: 'password',
      },
      {
        id: 'email',
        label: 'Email',
        key: 'email',
        required: false,
        controlType: 'email',
        type: 'text',
      },
      {
        id: 'phoneNumber',
        label: 'Phone number',
        key: 'phoneNumber',
        required: false,
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
    this.username = e.getValues()?.username?.value;
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
    const password = formValue.getValues()?.password?.value;
    const repeatedPassword = formValue.getValues()?.rePassword?.value;

    console.log('password', password);
    console.log(repeatedPassword);
    if (password && repeatedPassword && password !== repeatedPassword) {
      this.currentFormData = {
        ...this.currentFormData,
        ...formValue.getValues(),
      };

      this.passwordMessage = 'Passwords do not match';
      this.passwordsMatch = false;
    } else {
      this.passwordMessage = '';
      this.passwordsMatch = true;
    }
    this.formattedFormValuesObject = formValue.getValues();
    this.isFormValid = formValue.isValid;
  }

  onSave(e) {
    e.stopPropagation();
    let userGroups = [];
    Object.keys(this.selectedUserGroups).map((key) => {
      userGroups = [...userGroups, ...this.selectedUserGroups[key]];
    });

    this.savingUser = true;

    this.httpClient.get('system/id.json?limit=2').subscribe((idsResponse) => {
      if (idsResponse) {
        const data = {
          id: idsResponse['codes'][0],
          userCredentials: {
            id: idsResponse['codes'][1],
            userInfo: {
              id: idsResponse['codes'][0],
            },
            cogsDimensionConstraints: [],
            catDimensionConstraints: [],
            username: this.username,
            password: this.formattedFormValuesObject?.password?.value,
            userRoles: this.selectedUserRoles,
          },
          surname: this.formattedFormValuesObject?.surname?.value,
          firstName: this.formattedFormValuesObject?.firstname?.value,
          email: this.formattedFormValuesObject?.email?.value,
          phoneNumber: this.formattedFormValuesObject?.phoneNumber?.value,
          organisationUnits: map(this.selectedOrgUnits, (ou) => {
            return { id: ou?.id };
          }),
          dataViewOrganisationUnits: map(this.selectedOrgUnits, (ou) => {
            return { id: ou?.id };
          }),
          userGroups: userGroups,
          attributeValues: [],
        };

        // console.log(data);

        this.saveUserResponse$ = this.httpClient.post('users', data);
        this.saveUserResponse$.subscribe((response) => {
          if (response) {
            this.savingUser = false;
            this.atLeastOneUSerAdded = true;
            this.savingUserMessage = 'Saved successfully';
            setTimeout(() => {
              this.savingUserMessage = '';
            }, 1000);
          }
        });
      }
    });
  }

  onGetSelectedItems(items, type, category?) {
    console.log(items);
    console.log(type);
    if (type == 'ROLES') {
      this.selectedUserRoles = map(items, (item) => {
        return { id: item?.id };
      });
    } else {
      this.selectedUserGroups[category?.name] = map(items, (item) => {
        return { id: item?.id };
      });
    }
  }

  onFilterUpdate(selections) {
    console.log(selections);
    this.ouFilterIsSet = false;
    this.selectedOrgUnits = selections?.items;
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onFilterClose(selections) {
    this.ouFilterIsSet = false;
  }

  onClose(e) {
    e.stopPropagation();
    console.log('reLoadUsers', this.atLeastOneUSerAdded);
    if (this.atLeastOneUSerAdded) {
      this.dialogRef.close(this.atLeastOneUSerAdded);
    } else {
      this.dialogRef.close(null);
    }
  }
}
