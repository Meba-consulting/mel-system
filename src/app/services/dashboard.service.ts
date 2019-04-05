import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import * as _ from 'lodash';

import { Dashboard } from '../dashboard/models';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { DashboardSettings } from '../dashboard/models/dashboard-settings.model';
import { generateUid } from '../helpers/generate-uid.helper';
import { HttpClient } from '@angular/common/http';
import { filterStringListBasedOnMatch } from '../helpers';
@Injectable({ providedIn: 'root' })
export class DashboardService {
  dashboardUrlFields: string;
  // TODO: Update http client service to have option to load from external url
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private http: HttpClient
  ) {
    this.dashboardUrlFields =
      '?fields=id,name,description,publicAccess,access,externalAccess,created,lastUpdated,favorite,' +
      'user[id,name],dashboardItems[id,type,created,lastUpdated,shape,appKey,chart[id,displayName],' +
      'map[id,displayName],reportTable[id,displayName],eventReport[id,displayName],eventChart[id,displayName]]&paging=false';
  }

  loadAll(dashboardSettings: DashboardSettings): Observable<Dashboard[]> {
    return dashboardSettings && dashboardSettings.useDataStoreAsSource
      ? this.loadFromDataStore(dashboardSettings)
      : this.loadFromApi();
  }

  loadFromApi() {
    return this.httpClient
      .get(
        `dashboards.json?fields=id,name,description,access,created,lastUpdated,favorite,favorites&paging=false`
      )
      .pipe(
        map((dashboardResponse: any) => dashboardResponse.dashboards || [])
      );
  }

  loadFromDataStore(dashboardSettings: DashboardSettings) {
    return this.httpClient.get('dataStore/dashboards').pipe(
      catchError(() => of([])),
      mergeMap((dashboardIds: Array<string>) => {
        const filteredDashboardIds = filterStringListBasedOnMatch(
          dashboardIds,
          dashboardSettings.namespace
        );

        if (filteredDashboardIds.length === 0) {
          // Create dashboards if not found
          return this.http.get('config/dashboards.json').pipe(
            switchMap((dashboards: any) => {
              return forkJoin(
                _.map(dashboards, (dashboard: any) =>
                  this.create(dashboard, dashboardSettings)
                )
              );
            }),
            catchError(() => of([]))
          );
        }

        return forkJoin(
          _.map(filteredDashboardIds, dashboardId => {
            return this.httpClient.get(`dataStore/dashboards/${dashboardId}`);
          })
        );
      })
    );
  }

  load(
    id: string,
    dashboardSettings: DashboardSettings,
    customFields?: string
  ): Observable<Dashboard[]> {
    const dashboardUrl =
      dashboardSettings && dashboardSettings.useDataStoreAsSource
        ? `dataStore/dashboards/${dashboardSettings.namespace}_${id}`
        : `dashboards/${id}.json${customFields || this.dashboardUrlFields}`;
    return this.httpClient.get(dashboardUrl);
  }

  create(dashboard: Dashboard, dashboardSettings: DashboardSettings) {
    const sanitizedDashboard: any = dashboardSettings.allowAdditionalAttributes
      ? dashboard
      : _.omit(dashboard, dashboardSettings.additionalAttributes);
    return dashboardSettings && dashboardSettings.useDataStoreAsSource
      ? this.httpClient
          .post(
            `dataStore/dashboards/${dashboardSettings.namespace}_${
              dashboard.id
            }`,
            sanitizedDashboard
          )
          .pipe(map(() => sanitizedDashboard))
      : this.httpClient
          .post('dashboards.json', sanitizedDashboard)
          .pipe(map(() => sanitizedDashboard));
  }

  bookmarkDashboard(
    dashboardId: string,
    bookmarked: boolean,
    supportBookmark: boolean,
    currentUserId: string
  ) {
    return supportBookmark
      ? this._bookmarkDashboardByApi(dashboardId, bookmarked)
      : this._bookmarkDashboardByDataStore(
          dashboardId,
          currentUserId,
          bookmarked
        );
  }

  manageDashboardItem(
    dashboardId: string,
    dashboardItem: any,
    dashboardSettings: DashboardSettings,
    action: string
  ) {
    // TODO find best way for this as this approach is deprecated
    const dashboardLoadPromise =
      dashboardSettings && dashboardSettings.useDataStoreAsSource
        ? this.httpClient.get(`dataStore/dashboards/${dashboardId}`)
        : this.load(
            dashboardId,
            dashboardSettings,
            '?fields=id,created,lastUpdated,externalAccess,publicAccess,favorites,' +
              'translations,name,userAccesses,userGroupAccesses,dashboardItems[id,type,appKey,chart[id,name],' +
              'map[id,name],reportTable[id,name],eventReport[id,name],eventChart[id,name]]'
          );

    return dashboardLoadPromise.pipe(
      switchMap((dashboard: any) => {
        const newDashboardItem = {
          ...dashboardItem,
          id: dashboardItem.id || generateUid()
        };

        const newDashboardItems = this._manageDasboardItems(
          dashboard.dashboardItems || [],
          newDashboardItem,
          action
        );

        const dashboardUpdateUrl =
          dashboardSettings && dashboardSettings.useDataStoreAsSource
            ? `dataStore/dashboards/${dashboardId}`
            : `dashboards/${dashboardId}?mergeMode=MERGE`;
        return this.httpClient
          .put(dashboardUpdateUrl, {
            ...dashboard,
            dashboardItems: newDashboardItems
          })
          .pipe(
            map(() => {
              return { dashboardId, dashboardItem: newDashboardItem, action };
            })
          );
      })
    );
  }

  private _manageDasboardItems(
    dashboardItems: any[],
    incomingDashboardItem: any,
    action: string
  ) {
    switch (action) {
      case 'ADD': {
        return [incomingDashboardItem, ...dashboardItems];
      }
      case 'UPDATE': {
        const correspondingDashboardItem = _.find(dashboardItems, [
          'id',
          incomingDashboardItem.id
        ]);
        const dashboardItemIndex = dashboardItems.indexOf(
          correspondingDashboardItem
        );

        return dashboardItemIndex !== -1
          ? [
              ..._.slice(dashboardItems, 0, dashboardItemIndex),
              incomingDashboardItem,
              ..._.slice(dashboardItems, dashboardItemIndex + 1)
            ]
          : dashboardItems;
      }
      case 'DELETE': {
        const correspondingDashboardItem = _.find(dashboardItems, [
          'id',
          incomingDashboardItem.id
        ]);
        const dashboardItemIndex = dashboardItems.indexOf(
          correspondingDashboardItem
        );
        return dashboardItemIndex !== -1
          ? [
              ..._.slice(dashboardItems, 0, dashboardItemIndex),
              ..._.slice(dashboardItems, dashboardItemIndex + 1)
            ]
          : dashboardItems;
      }
      default:
        return dashboardItems;
    }
  }

  private _bookmarkDashboardByApi(dashboardId: string, bookmarked: boolean) {
    return bookmarked
      ? this.httpClient.post(`dashboards/${dashboardId}/favorite`, {})
      : this.httpClient.delete(`dashboards/${dashboardId}/favorite`);
  }

  private _bookmarkDashboardByDataStore(
    dashboardId: string,
    currentUserId: string,
    bookmarked: boolean
  ) {
    return this.httpClient.get(`dataStore/dashboards/${dashboardId}`).pipe(
      switchMap((dashboardOption: any) =>
        this.httpClient.put(`dataStore/dashboards/${dashboardId}`, {
          ...dashboardOption,
          bookmarks: bookmarked
            ? dashboardOption.bookmarks.indexOf(currentUserId) === -1
              ? [...dashboardOption.bookmarks, currentUserId]
              : [...dashboardOption.bookmarks]
            : _.filter(
                dashboardOption.bookmarks,
                bookmark => bookmark !== currentUserId
              )
        })
      ),
      catchError(() =>
        this.httpClient.post(`dataStore/dashboards/${dashboardId}`, {
          id: dashboardId,
          bookmarks: [currentUserId]
        })
      )
    );
  }
}
