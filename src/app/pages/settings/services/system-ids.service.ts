import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SystemIdsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getSystemIds(limit): Observable<any> {
    return this.httpClient.get('system/id.json?limit=' + limit).pipe(
      map((response) => {
        return response['codes'];
      })
    );
  }
}
