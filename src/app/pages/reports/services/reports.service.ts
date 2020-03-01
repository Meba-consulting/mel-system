import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  getReportsList(): Observable<any> {
    return this.httpClient.get('dataStore/standardReports/reportsList.json');
  }

  getReportById(id): Observable<any> {
    return this.httpClient.get('dataStore/standardReports/' + id);
  }

  loadIndicatorData(dimensions): Observable<any> {
    console.log('dimensions ', dimensions);
    return this.httpClient.get(
      'analytics?dimension=dx:' +
        dimensions.dx.join(';') +
        '&dimension=ou:' +
        dimensions.ou +
        '&filter=pe:' +
        dimensions.pe.join(';') +
        '&displayProperty=NAME&skipMeta=false&includeNumDen=true'
    );
  }
  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
