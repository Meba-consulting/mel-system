import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  createProgram(details): Observable<any> {
    return this.httpClient.post('programs', details);
  }

  getProgramById(id, fields?): Observable<any> {
    return this.httpClient.get('programs/' + id);
  }

  getTrackerPrograms(): Observable<any> {
    return this.httpClient.get(
      'programs.json?paging=false&fields=id,name,organisationUnits,userGroupAccesses,incidentDateLabel,trackedEntityType[id,name,trackedEntityTypeAttributes[id,name,mandatory,trackedEntityAttribute[id,name,valueType,optionSet[id,name,valueType,options[id,name,valueType]]]]],userGroupAccesses[*],programIndicators[id,name,expression],name,dataEntryForm[id,name,htmlCode],programTrackedEntityAttributes[id,name,code,valueType,trackedEntityAttribute[id,name,optionSet[id,name,valueType,options[id,name,valueType]]]],programStages[sortOrder,programStageSections[dataElements[id,name]],userGroupAccesses[*],id,name,dataEntryForm[id,htmlCode],programStageDataElements[dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]'
    );
  }
}
