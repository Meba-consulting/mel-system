import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import * as _ from 'lodash';
import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class InterventionService {
  constructor(private http: NgxDhis2HttpClientService) {}

  loadAll(settings: any = { namespace: 'bna-dashboard' }): Observable<any[]> {
    return this.http.get('dataStore/dashboards').pipe(
      mergeMap((dashboardIds: Array<string>) => {
        const filteredDashboardIds = _.filter(
          dashboardIds,
          (dashboardId: string) => {
            const splitedDashboardId = dashboardId.split('_');
            const dashboardNamespace = splitedDashboardId[0] || '';
            return dashboardNamespace === settings.namespace;
          }
        );

        if (filteredDashboardIds.length === 0) {
          return of([]);
        }
        return forkJoin(
          _.map(filteredDashboardIds, dashboardId => {
            return this.http.get(`dataStore/dashboards/${dashboardId}`);
          })
        );
      }),
      catchError(() => of([]))
    );
  }
}
