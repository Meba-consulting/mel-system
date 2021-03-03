import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sharing-settings',
  templateUrl: './sharing-settings.component.html',
  styleUrls: ['./sharing-settings.component.css'],
})
export class SharingSettingsComponent implements OnInit {
  currentResource: any;
  userGroupSearchingText: string = '';
  sharingSettingsMessage: string = '';
  userGroups: any[];
  resourceUserGroupsAccesses$: Observable<any>;
  resource$: Observable<any>;
  resourceUrl: string;
  sharingSettingsUrl: string;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private dialogRef: MatDialogRef<SharingSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.currentResource = data.resource;
    this.userGroups = data.groups;
    console.log('currentResource', this.currentResource);
    this.resourceUrl = data?.resourceUrl;
    this.sharingSettingsUrl = data?.sharingSettingsUrl;
    this.resource$ = this.httpClient.get(this.resourceUrl);
    this.resourceUserGroupsAccesses$ = this.httpClient.get(
      this.sharingSettingsUrl
    );
  }

  ngOnInit(): void {}

  addUserGroupToSharingSettings(e, userGroup, resource) {
    e.stopPropagation();
    let userGroupAccesses = [];
    let sharingSettingsData = {
      meta: {
        allowPublicAccess: true,
        allowExternalAccess: true,
      },
      object: {
        id: resource.id,
        name: resource.name,
        displayName: resource.name,
        publicAccess: 'r-------',
        externalAccess: false,
        userGroupAccesses: [],
      },
    };
    userGroupAccesses.push({
      id: userGroup.id,
      name: userGroup.name,
      displayName: userGroup.name,
      access: 'r-------',
    });
    userGroupAccesses = [...userGroupAccesses, ...resource.userGroupAccesses];
    sharingSettingsData.object.userGroupAccesses = _.uniqBy(
      userGroupAccesses,
      'id'
    );
    this.sharingSettingsMessage = 'Saving sharing settings.......!';
    this.httpClient
      .post(this.sharingSettingsUrl, sharingSettingsData)
      .subscribe(
        (sharingResponse) => {
          this.sharingSettingsMessage = 'Sharing settings saved!';
          setTimeout(() => {
            this.sharingSettingsMessage = '';
            setTimeout(() => {
              // this.sharingSettings = false;

              this.resource$ = this.httpClient.get(this.resourceUrl);
              this.resourceUserGroupsAccesses$ = this.httpClient.get(
                this.sharingSettingsUrl
              );
            }, 1000);
          }, 2000);
        },
        (error) => {
          console.log(error);
          setTimeout(() => {
            this.sharingSettingsMessage = error.message;
            setTimeout(() => {
              // this.sharingSettings = false;
            }, 1000);
          }, 2000);
        }
      );
  }

  removeUserGroupAccess(e, userGroupToRemove, resource) {
    e.stopPropagation();
    let userGroupAccesses = [];
    let sharingSettingsData = {
      meta: {
        allowPublicAccess: true,
        allowExternalAccess: true,
      },
      object: {
        id: resource.id,
        name: resource.name,
        displayName: resource.name,
        publicAccess: 'r-------',
        externalAccess: false,
        userGroupAccesses: [],
      },
    };
    userGroupAccesses = _.filter(resource.userGroupAccesses, (userGroup) => {
      if (userGroup.id != userGroupToRemove.id) {
        return userGroup;
      }
    });
    sharingSettingsData.object.userGroupAccesses = _.uniqBy(
      userGroupAccesses,
      'id'
    );
    this.sharingSettingsMessage =
      'Removing "' + userGroupToRemove.displayName + '"............';
    this.httpClient
      .post(this.sharingSettingsUrl, sharingSettingsData)
      .subscribe(
        (sharingResponse) => {
          this.sharingSettingsMessage = 'Changes saved!';
          setTimeout(() => {
            this.sharingSettingsMessage = '';

            this.resource$ = this.httpClient.get(this.resourceUrl);
            this.resourceUserGroupsAccesses$ = this.httpClient.get(
              this.sharingSettingsUrl
            );
          }, 2000);
        },
        (error) => {
          console.log(error);
          setTimeout(() => {
            this.sharingSettingsMessage = error.message;
            // setTimeout(() => {
            //   this.sharingSettings = false;
            // }, 1000);
          }, 2000);
        }
      );
  }

  closeSharingSettings(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }

  onEndSharingSettings(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
