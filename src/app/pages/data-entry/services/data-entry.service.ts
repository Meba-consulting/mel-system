import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { keyBy } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataEntryService {
  getProgramMetadata(id): Observable<any> {
    return this.httpClient.get(
      'programs.json?filter=id:in:[' +
        id +
        ']&fields=id,userGroupAccesses[*],programIndicators[id,name],name,description,dataEntryForm[id,name,htmlCode],programTrackedEntityAttributes[id,name,code,valueType],programStages[sortOrder,userGroupAccesses[*],id,name,dataEntryForm[id,htmlCode],programStageDataElements[dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]'
    );
  }

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

  getProgramDataEntryFlowConfigs(id): Observable<any> {
    return this.httpClient.get('dataStore/data-entry/' + id);
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

  getFileResource(id): Observable<any> {
    return this.httpClient.get('fileResources/' + id + '.json');
  }

  getEventDataById(eventId): Observable<any> {
    return this.httpClient.get('events/' + eventId + '.json');
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

  getTrackedEntityInstanceById(id): Observable<any> {
    return this.httpClient.get('trackedEntityInstances/' + id + '.json');
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

  getBasicOuDetails(id): Observable<any> {
    return this.httpClient.get(
      'organisationUnits/' + id + '.json?fields=id,name,level'
    );
  }

  getEventsData(dimension): Observable<any> {
    return this.httpClient.get(
      'events.json?paging=false&orgUnit=' +
        dimension.ou +
        '&program=' +
        dimension.program +
        '&programStage=' +
        dimension.programStage +
        '&order=eventDate:desc'
    );
  }

  deleteEvent(id): Observable<any> {
    return this.httpClient.delete('events/' + id);
  }

  saveAggregateData(data): Observable<any> {
    return this.httpClient.post(
      'dataValueSets?importStrategy=CREATE_AND_UPDATE&async=true',
      data
    );
  }

  getDataSetValues(dataSet, periodId, ouId): Observable<any> {
    return this.httpClient
      .get(
        `dataValueSets.json?dataSet=${dataSet}&period=${periodId}&orgUnit=${ouId}`
      )
      .pipe(
        map((response) => {
          return {
            ...response,
            keyedDataValues: response?.dataValues
              ? keyBy(
                  response?.dataValues.map((dataValue) => {
                    return {
                      ...dataValue,
                      id:
                        dataValue?.dataElement +
                        '-' +
                        dataValue?.categoryOptionCombo,
                      domElementId:
                        dataValue?.dataElement +
                        '-' +
                        dataValue?.categoryOptionCombo +
                        '-val',
                    };
                  }),
                  'id'
                )
              : {},
          };
        })
      );
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
