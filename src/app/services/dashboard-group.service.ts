import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { mergeMap, switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { DashboardGroups } from '../dashboard/models';
import { DashboardSettings } from '../dashboard/models/dashboard-settings.model';

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
        const filteredDashboardGroupIds = _.filter(
          dashboardGroupIds,
          (dashboardGroupId: string) => {
            const splitedDashboardGroupId = dashboardGroupId.split('_');
            const dashboardGroupNamespace = splitedDashboardGroupId[0] || '';
            return dashboardGroupNamespace === dashboardSettings.id;
          }
        );

        if (filteredDashboardGroupIds.length === 0) {
          // Create dashboards if not found
          return this.http.get('config/dashboard-groups.json').pipe(
            switchMap((dashboardGroups: any[]) => {
              return forkJoin(
                _.map(dashboardGroups, (dashboardGroup: any) =>
                  this.create(dashboardGroup, dashboardSettings)
                )
              );
            }),
            catchError(() => of([]))
          );
        }

        return forkJoin(
          _.map(filteredDashboardGroupIds, dashboardGroupId => {
            return this.httpClient.get(
              `${this._dataStoreUrl}/${dashboardGroupId}`
            );
          })
        );
      })
    );
  }

  create(
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
