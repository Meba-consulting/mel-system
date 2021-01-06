import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  saveTrackedEntityInstanceAndAssociatedData(data): Observable<any> {
    return this.httpClient.post('trackedEntityInstances', data);
  }

  getTrackedEntityInstanceDetails(id): Observable<any> {
    return this.httpClient.get('trackedEntityInstances/' + id);
  }

  getTrackedEntityInstances(parameters): Observable<any> {
    return this.httpClient.get(
      'trackedEntityInstances/query.json?ou=' +
        parameters?.orgUnit +
        '&program=' +
        parameters?.program +
        '&pageSize=50&page=1&totalPages=false'
    );
  }

  deleteTrackedEntityInstance(id): Observable<any> {
    console.log('id for deleting', id);
    return this.httpClient.delete('trackedEntityInstances/' + id).pipe(
      map((response) => {
        return response;
      }),
      catchError((e) => {
        return of(e);
      })
    );
  }
}
