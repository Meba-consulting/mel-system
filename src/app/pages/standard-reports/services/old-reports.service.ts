import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OldReportsService {
  loadReportsList(reportType): Observable<any> {
    return this.httpClient.get(reportType.url);
  }

  loadReportContents(reportId, reportType): Observable<any> {
    if (reportType != 'interactive-report') {
      return this.httpClient.get(
        'reports/' + reportId + '.json?paging=false&fields=id,name,*'
      );
    } else {
      return this.httpClient.get('dataStore/report-templates/' + reportId);
    }
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
