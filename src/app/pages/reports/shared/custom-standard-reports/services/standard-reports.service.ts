import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class StandardReportsService {
  loadStandardReportsConfigs(reportId): Observable<any> {
    return this.httpClient.get('dataStore/standardReports/' + reportId);
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
