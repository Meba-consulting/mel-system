import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DashboardSettingsService {
  private _dataStoreUrl: string;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {
    this._dataStoreUrl = 'dataStore/dashboard-preferences';
  }

  loadAll() {
    return this._getPreferences().pipe(
      mergeMap((dashboardPreferences: any) => {
        if (!dashboardPreferences) {
          return of(null);
        }

        return this.httpClient.get(this._dataStoreUrl).pipe(
          mergeMap((dashboarPreferencesList: Array<string>) => {
            return (dashboarPreferencesList || []).indexOf(
              dashboardPreferences.namespace
            ) !== -1
              ? this.httpClient.get(
                  `${this._dataStoreUrl}/${dashboardPreferences.namespace}`
                )
              : this.create(dashboardPreferences);
          }),
          catchError((error: any) => {
            if (error.status !== 404) {
              return throwError(error);
            }

            return this.create(dashboardPreferences);
          })
        );
      }),
      catchError((error: any) => of(null))
    );
  }

  private _getPreferences() {
    return this.http
      .get('config/dashboard-preferences.json')
      .pipe(catchError(() => of(null)));
  }

  create(dashboardPreferences: any) {
    if (!dashboardPreferences) {
      return throwError({
        status: '400',
        statusText: 'ERROR',
        message: 'Dashboard preferences object is not defined'
      });
    }
    return this.httpClient.post(
      `${this._dataStoreUrl}/${dashboardPreferences.namespace}`,
      { ...dashboardPreferences, id: dashboardPreferences.namespace }
    );
  }
}
