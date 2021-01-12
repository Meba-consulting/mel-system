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

  saveTrackedEntityInstanceAndAssociatedData(
    data,
    editing,
    trackedEntityInstanceId,
    program
  ): Observable<any> {
    if (!editing) {
      return this.httpClient.post('trackedEntityInstances', data);
    } else {
      return this.httpClient
        .put(
          'trackedEntityInstances/' +
            trackedEntityInstanceId +
            '??program=' +
            program?.id,
          data
        )
        .pipe(
          map((response) => {
            return response;
          }),
          catchError((e) => {
            return of(e);
          })
        );
    }
  }

  getTrackedEntityInstanceDetails(id): Observable<any> {
    return this.httpClient.get('trackedEntityInstances/' + id);
  }

  getTrackedEntityInstanceDetailsByProgram(id, program): Observable<any> {
    return this.httpClient.get(
      'trackedEntityInstances/' +
        id +
        '.json?program=' +
        program?.id +
        '&fields=*'
    );
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

  saveEventsData(data): Observable<any> {
    return this.httpClient.post('events.json', data).pipe(
      map((response) => {
        return response;
      }),
      catchError((e) => {
        return of(e);
      })
    );
  }

  updateEventData(id, data): Observable<any> {
    return this.httpClient.put('events/' + id + '.json', data).pipe(
      map((response) => {
        return response;
      }),
      catchError((e) => {
        return of(e);
      })
    );
  }

  getSavedUserDataStoreProgramConfigurations(id): Observable<any> {
    return this.httpClient
      .get('userDataStore/trackerCaptureGridColumns/' + id)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((e) => {
          return of(e);
        })
      );
  }

  deleteEvent(id): Observable<any> {
    return this.httpClient.delete('events/' + id).pipe(
      map((response) => {
        return response;
      }),
      catchError((e) => {
        return of(e);
      })
    );
  }
}
