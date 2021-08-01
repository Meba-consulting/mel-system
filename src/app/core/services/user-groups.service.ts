import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserGroupsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadUserGroups(): Observable<any> {
    return this.httpClient
      .get(
        'userGroups.json?fields=*,managedGroups[id,name,managedGroups[id,name]]&paging=false'
      )
      .pipe(
        map((response) => {
          const userGroups = response['userGroups'];
          return userGroups.map((userGroup) => {
            console.log(
              userGroup?.attributeValues?.length > 0
                ? (userGroup?.attributeValues.filter(
                    (attributeValue) =>
                      attributeValue?.attribute?.id === 'qIOZ66mfrOr'
                  ) || [])[0]?.value
                : 'NO'
            );
            return {
              ...userGroup,
              displayName: userGroup?.name.replace(
                '_GENERAL REGISTRATION ',
                ''
              ),
              description:
                userGroup?.attributeValues?.length > 0
                  ? (userGroup?.attributeValues.filter(
                      (attributeValue) =>
                        attributeValue?.attribute?.id === 'qIOZ66mfrOr'
                    ) || [])[0]?.value
                  : '',
            };
          });
        })
      );
  }
}
