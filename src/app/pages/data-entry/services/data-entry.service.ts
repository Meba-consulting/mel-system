import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataEntryService {
  getFormsByOu(ou): Observable<any> {
    return this.httpClient.get(
      'organisationUnits/' +
        ou +
        '.json?fields=id,name,programs[id,name,dataEntryForm[id,name,htmlCode],programTrackedEntityAttributes[id,name,code,valueType],programStages[id,name,dataEntryForm[id,htmlCode],programStageDataElements[dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]]'
    );
  }

  getDataEntryFlow(): Observable<any> {
    return this.httpClient.get('dataStore/data-entry/data-flow');
  }

  loadEvents(dimension): Observable<any> {
    return this.httpClient.get(
      'events/query.json?orgUnit=' +
        dimension.ou +
        '&programStage=' +
        dimension.stage +
        '&order=lastUpdated:desc&paging=false'
    );
  }

  saveTrackedEntityInstances(data): Observable<any> {
    return this.httpClient.post('trackedEntityInstances', data);
  }

  saveEnrollments(data): Observable<any> {
    return this.httpClient.post('enrollments', data);
  }

  getTrackedEntityInstancesList(dimension): Observable<any> {
    return this.httpClient.get(
      'trackedEntityInstances.json?ou=' +
        dimension.ou +
        '&program=' +
        dimension.program
    );
  }

  getTrackedEntityInstancesInfo(dimension): Observable<any> {
    return this.httpClient.get(
      'trackedEntityInstances/' +
        dimension.tei +
        '.json?program=' +
        dimension.program +
        '&fields=*'
    );
  }

  getTrackedEntityAttributes(): Observable<any> {
    return this.httpClient.get(
      'trackedEntityAttributes.json?fields=id,name,code,valueType'
    );
  }

  getUID(): Observable<any> {
    return this.httpClient.get('system/id.json');
  }

  saveEventsById(event, dataElement, data): Observable<any> {
    return this.httpClient.put('events/' + event + '/' + dataElement, data);
  }

  saveEvents(data): Observable<any> {
    return this.httpClient.post('events', data);
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
