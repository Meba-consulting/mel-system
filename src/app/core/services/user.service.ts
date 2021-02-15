import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadUsers(): Observable<any> {
    return this.httpClient.get('users.json?fields=*&paging=false');
  }

  loadUserRoles(): Observable<any> {
    return this.httpClient.get('userRoles.json?fields=*&paging=false');
  }
}
