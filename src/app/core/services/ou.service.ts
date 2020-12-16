import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OuService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  saveOu(ouDetails): Observable<any> {
    return this.httpClient.post('organisationUnits', ouDetails);
  }

  getClubsFromSQLVIEW(): Observable<any> {
    return this.httpClient.get('sqlViews/XdKuQ1Z92PC/data?paging=false');
  }
}
