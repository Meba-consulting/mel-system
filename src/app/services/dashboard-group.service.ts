import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { of, zip } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { DashboardGroups } from '../dashboard/models';
import { DashboardSettings } from '../dashboard/models/dashboard-settings.model';
import { filterStringListBasedOnMatch } from '../helpers';

@Injectable({ providedIn: 'root' })
export class DashboardGroupService {
  private _dataStoreUrl: string;
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {
    this._dataStoreUrl = 'dataStore/dashboard-groups';
  }

  loadAll(dashboardSettings: DashboardSettings) {
    return this.httpClient.get(this._dataStoreUrl).pipe(
      catchError(() => of([])),
      mergeMap((dashboardGroupIds: Array<string>) => {
        const filteredDashboardGroupIds = filterStringListBasedOnMatch(
          dashboardGroupIds,
          dashboardSettings.id
        );

        // Create dashboard groups if not found
        if (filteredDashboardGroupIds.length === 0) {
          return this._getDashboardGroupFromConfig().pipe(
            switchMap((dashboardGroups: any[]) => {
              if (dashboardGroups.length === 0) {
                return of([]);
              }
              return this._createAll(dashboardGroups, dashboardSettings);
            }),
            catchError(() => of([]))
          );
        }

        return this._loadAllFromDataStore(filteredDashboardGroupIds);
      })
    );
  }

  private _loadAllFromDataStore(dashboardGroupIds: string[]) {
    return zip(
      ..._.map(dashboardGroupIds, dashboardGroupId => {
        return this.httpClient.get(`${this._dataStoreUrl}/${dashboardGroupId}`);
      })
    ).pipe(catchError(() => of([])));
  }

  private _getDashboardGroupFromConfig() {
    return this.http.get('config/dashboard-groups.json').pipe(
      map((dashboardGroups: any[]) => dashboardGroups || []),
      catchError(() => of([]))
    );
  }

  private _createAll(
    dashboardGroups: DashboardGroups[],
    dashboardSettings: DashboardSettings
  ) {
    return zip(
      ..._.map(dashboardGroups, (dashboardGroup: any) =>
        this._create(dashboardGroup, dashboardSettings)
      )
    ).pipe(catchError(() => of([])));
  }

  private _create(
    dashboardGroup: DashboardGroups,
    dashboardSettings: DashboardSettings
  ) {
    return this.httpClient
      .post(
        `${this._dataStoreUrl}/${dashboardSettings.id}_${dashboardGroup.id}`,
        dashboardGroup
      )
      .pipe(map(() => dashboardGroup));
  }
}
