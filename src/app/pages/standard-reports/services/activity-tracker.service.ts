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

  getIndicators(): Observable<any[]> {
    return this.httpClient
      .get('programIndicators.json?fields=id,name,displayName,indicatorType')
      .pipe(
        map((response) => {
          return response?.programIndicators || [];
        })
      );
  }

  getResponsibleList(): Observable<any> {
    return this.httpClient.get('userGroups?fields=id,name,displayName').pipe(
      map((response) => {
        return (response?.userGroups || [])
          .map((userGroup) => {
            if (userGroup?.name?.toLowerCase().indexOf('_titles') === 0) {
              console.log('userGroup', userGroup);
              return {
                ...userGroup,
                name: userGroup?.name
                  .replace('_TITLES ', '')
                  .replace('_TITLE ', ''),
                displayName: userGroup?.displayName
                  .replace('_TITLES ', '')
                  .replace('_TITLE ', ''),
              };
            }
          })
          .filter((formattedUserGroup) => formattedUserGroup);
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
