import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeneralReportsService {
  constructor(
    private httpClientService: NgxDhis2HttpClientService,
    private httpClient: HttpClient
  ) {}

  getEnrollmentDetailsFromSQLView(dimensions) {
    return this.httpClientService.get(
      `sqlViews/wFj0EzcKeWs/data.json?var=startdate:${dimensions.startDate}&var=enddate:${dimensions.endDate}&var=uids:${dimensions.ou}&var=programuid:${dimensions.program}&paging=false`
    );
  }

  getAllEventsByTrackedEntityInstances(
    trackedEntityInstances
  ): Observable<any> {
    return zip(
      ...trackedEntityInstances.map((trackedEntityInstanceData: any) => {
        return from(
          this.httpClientService.get(
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
          this.httpClientService.get(
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
    return await this.httpClientService.get(
      `trackedEntityInstances/${trackedEntityInstance}`
    );
  }

  async getEventsByTrackedEntityInstance(trackedEntityInstanceData) {
    return await this.httpClientService
      .get(
        `events.json?trackedEntityInstance=${trackedEntityInstanceData?.trackedEntityInstance}`
      )
      .toPromise();
  }

  getGeneralReportDataStoreConfigs(program) {
    return this.httpClientService.get(
      `dataStore/standard-reports/general_${program?.id}`
    );
  }

  getDataSetReport(dimension): Observable<any> {
    return this.httpClient.get(
      'api/dataSetReport/custom?filter=&ds=' +
        dimension.ds +
        '&pe=' +
        dimension.pe +
        '&ou=' +
        dimension.ou +
        '&selectedUnitOnly=false',
      {
        headers: {
          'Content-Type': 'text/html;charset=ISO-8859-1',
        },
        responseType: 'text',
      }
    );
  }
}
