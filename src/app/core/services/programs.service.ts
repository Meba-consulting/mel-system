import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadPrograms(): Observable<any> {
    return this.httpClient.get(
      'programs.json?paging=false&fields=id,name,description,programType,organisationUnits,userGroupAccesses,incidentDateLabel,attributeValues,trackedEntityType[id,name,trackedEntityTypeAttributes[id,name,mandatory,trackedEntityAttribute[id,name,valueType,optionSet[id,name,valueType,options[id,name,code]]]]],userGroupAccesses[*],programIndicators[id,name,expression],name,dataEntryForm[id,name,htmlCode],programTrackedEntityAttributes[id,name,code,valueType,trackedEntityAttribute[id,name,optionSet[id,name,valueType,options[id,name,code]]]],programStages[repeatable,sortOrder,programStageSections[id,name,description,sortOrder,dataElements[id,name,optionSet[id,name,valueType,options[id,name,code]]]],userGroupAccesses[*],id,name,dataEntryForm[id,htmlCode],programStageDataElements[displayInReports,compulsory,dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]'
    );
  }
}
