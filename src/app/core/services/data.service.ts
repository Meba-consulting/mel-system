import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getRegisteredMembers(parameters): Observable<any> {
    return this.httpClient.get(
      'trackedEntityInstances/query.json?ou=' +
        parameters?.orgUnit +
        '&program=' +
        parameters?.program +
        '&pageSize=50&page=1&totalPages=false'
    );
  }
}
