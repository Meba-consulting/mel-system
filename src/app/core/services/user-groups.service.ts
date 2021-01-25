import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGroupsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadUserGroups(): Observable<any> {
    return this.httpClient.get(
      'userGroups.json?fields=*,managedGroups[id,name]&paging=false'
    );
  }
}
