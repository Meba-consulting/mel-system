import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {
  NgxDhis2HttpClientService,
  ManifestService,
  Manifest
} from '@hisptz/ngx-dhis2-http-client';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DashboardSettingsService {
  private _dataStoreUrl: string;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient,
    private manifestService: ManifestService
  ) {
    this._dataStoreUrl = 'dataStore/dashboard-preferences';
  }

  loadAll() {
    return this.manifestService.getManifest().pipe(
      mergeMap((manifestObject: any) => {
        // const namespace =
        //   manifestObject &&
        //   manifestObject.activities &&
        //   manifestObject.activities.dhis
        //     ? manifestObject.activities.dhis.namespace
        //     : 'default';

        const namespace = 'nmcp-malaria';

        return this.httpClient.get(this._dataStoreUrl).pipe(
          mergeMap((dashboardSettingsList: Array<string>) => {
            return dashboardSettingsList.indexOf(namespace) !== -1
              ? this.httpClient.get(`${this._dataStoreUrl}/${namespace}`).pipe(
                  map((dashboardSettings: any) => dashboardSettings),
                  catchError((error: any) => of(null))
                )
              : this.create(namespace);
          }),
          catchError((error: any) => {
            if (error.status !== 404) {
              return throwError(error);
            }

            return this.create(namespace);
          })
        );
      }),
      catchError((error: any) => of(null))
    );
  }

  create(namespace: string) {
    return this.http.get('config/dashboard-preferences.json').pipe(
      catchError(() => of(null)),
      switchMap((dashboardPreferences: any) => {
        const sanitizedDashboardPreferences = dashboardPreferences
          ? { ...dashboardPreferences, id: namespace }
          : { id: namespace };

        return this.httpClient
          .post(
            `${this._dataStoreUrl}/${namespace}`,
            sanitizedDashboardPreferences
          )
          .pipe(map(() => sanitizedDashboardPreferences));
      })
    );
  }
}
