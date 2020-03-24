import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsDataService {
  loadIndicatorData(dimensions): Observable<any> {
    console.log('dimensions ', dimensions);
    return this.httpClient.get(
      'analytics?filter=dx:' +
        dimensions.dx +
        '&dimension=ou:' +
        dimensions.ou.join(';') +
        '&dimension=pe:' +
        dimensions.pe +
        '&displayProperty=NAME&skipMeta=false&includeNumDen=false'
    );
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
