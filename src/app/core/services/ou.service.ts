import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OuService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private httpClientCore: HttpClient
  ) {}

  saveOu(ouDetails): Observable<any> {
    return this.httpClient.post('organisationUnits', ouDetails);
  }

  updateOu(ouDetails, id): Observable<any> {
    return this.httpClient.put('organisationUnits/' + id, ouDetails);
  }

  deleteOu(id): Observable<any> {
    console.log('delete', id);
    return this.httpClient.delete('../../../api/organisationUnits/' + id).pipe(
      map((response) => {
        console.log(response);
        return response;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  getOu(id): Observable<any> {
    return this.httpClient.get(
      'organisationUnits/' + id + '.json?fields=*,parent[id,name,code]'
    );
  }

  getClubsFromSQLVIEW(): Observable<any> {
    return this.httpClient.get('sqlViews/XdKuQ1Z92PC/data?paging=false').pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
