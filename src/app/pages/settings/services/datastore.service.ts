import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getDatastoreConfigsByKey(key): Observable<any> {
    return this.httpClient.get('datastore/planning/' + key);
  }

  createConfigs(configs): Observable<any> {
    return this.httpClient.post('datastore/planning', configs);
  }
}
