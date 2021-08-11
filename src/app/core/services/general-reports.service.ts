import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeneralReportsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getEnrollmentDetailsFromSQLView(dimensions) {
    return this.httpClient.get(
      `sqlViews/wFj0EzcKeWs/data.json?var=startdate:${dimensions.startDate}&var=enddate:${dimensions.endDate}&var=uids:${dimensions.ou}&var=programuid:${dimensions.program}&paging=false`
    );
  }

  getAllEventsByTrackedEntityInstances(
    trackedEntityInstances
  ): Observable<any> {
    return zip(
      ...trackedEntityInstances.map((trackedEntityInstanceData: any) => {
        return from(
          this.httpClient.get(
            `events.json?paging=false&trackedEntityInstance=${trackedEntityInstanceData?.trackedEntityInstance}`
          )
        ).pipe(
          map((response) => {
            return { ...response, ...trackedEntityInstanceData };
          })
        );
      })
    );
  }

  getAllTrackedEntityInstancesDetails(
    entityRows,
    trackedentityinstanceHeaderIndex
  ): Observable<any> {
    return zip(
      ...entityRows.map((row: any) => {
        return from(
          this.httpClient.get(
            `trackedEntityInstances/${row[trackedentityinstanceHeaderIndex]}`
          )
        ).pipe(
          map((response) => {
            return response;
          })
        );
      })
    );
  }

  async getTrackedEntityInstanceDetails(trackedEntityInstance) {
    return await this.httpClient.get(
      `trackedEntityInstances/${trackedEntityInstance}`
    );
  }

  async getEventsByTrackedEntityInstance(trackedEntityInstanceData) {
    return await this.httpClient
      .get(
        `events.json?trackedEntityInstance=${trackedEntityInstanceData?.trackedEntityInstance}`
      )
      .toPromise();
  }

  getGeneralReportDataStoreConfigs(program) {
    return this.httpClient.get(
      `dataStore/standard-reports/general_${program?.id}`
    );
  }
}
