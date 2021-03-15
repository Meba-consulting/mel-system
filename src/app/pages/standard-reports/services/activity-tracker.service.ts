import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActivityTrackerService {
  getActivityTrackerYears(): Observable<any> {
    return this.httpClient.get('dataStore/activity-trackers').pipe(
      map((keys) => {
        return keys;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  createActivityYear(key): Observable<any> {
    return this.httpClient.post('dataStore/activity-trackers/' + key, []);
  }

  getActivityDetailsByKey(key): Observable<any> {
    return this.httpClient.get('dataStore/activity-trackers/' + key);
  }

  saveActivityTrackerDetails(key, details): Observable<any> {
    return this.httpClient.put('dataStore/activity-trackers/' + key, details);
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
