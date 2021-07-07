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
    // console.log('delete', id);
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

  getClubsFromSQLVIEW(id): Observable<any> {
    // console.log('tete', id);
    if (id === 'GOMCSNn5OdW') {
      return this.httpClient.get('sqlViews/XdKuQ1Z92PC/data?paging=false').pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      );
    } else if (id === 'qU9PgHBxqCr') {
      return this.httpClient.get('sqlViews/LRH8gpD3GkF/data?paging=false').pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      );
    } else if (id === 'ltEpnsVKfQf') {
      return this.httpClient.get('sqlViews/jjP5V2dOLuX/data?paging=false').pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return of(error);
        })
      );
    }
  }

  addOuGroupMembers(data, groupId): Observable<any> {
    return this.httpClient.put(
      `organisationUnitGroups/${groupId}?mergeMode=MERGE`,
      data
    );
  }

  getOrgUnitsRegistrationConfigs(): Observable<any> {
    return this.httpClient.get(
      'dataStore/orgunits-registration/configurations'
    );
  }
}
