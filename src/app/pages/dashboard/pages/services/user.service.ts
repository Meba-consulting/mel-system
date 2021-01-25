import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  /**
   * Load current user information
   * @returns {Observable<User>}
   */
  loadCurrentUser(): Observable<User> {
    return this.httpClient
      .get(`me.json?fields=*,id,name,displayName,created,lastUpdated,email,userGroups[*],
    dataViewOrganisationUnits[id,name,level],organisationUnits[id,name,level],userCredentials[username],userGroups[id,name],*`);
  }

  getUserGroup(id): Observable<any> {
    return this.httpClient.get(
      'userGroups/' +
        id +
        '.json?fields=id,name,displayName,managedGroups[id,name]'
    );
  }
}
