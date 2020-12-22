import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getAttributes(): Observable<any> {
    return this.httpClient.get(
      'attributes.json?fields=id,name,optionSet[id,name,options[id,name]],organisationUnitAttribute&paging=false'
    );
  }

  saveTrackedEntityInstanceData(data): Observable<any> {
    return this.httpClient.post('trackedEntityInstances', data);
  }

  saveEnrollments(data): Observable<any> {
    return this.httpClient.post('enrollments', data);
  }
}
