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
      'programs.json?paging=false&fields=id,name,trackedEntityType[id,name,trackedEntityTypeAttributes[id,name,trackedEntityAttribute[id,name,valueType]]],userGroupAccesses[*],programIndicators[id,name,expression],name,dataEntryForm[id,name,htmlCode],programTrackedEntityAttributes[id,name,code,valueType],programStages[sortOrder,programStageSections[dataElements[id,name]],userGroupAccesses[*],id,name,dataEntryForm[id,htmlCode],programStageDataElements[dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]'
    );
  }
}
