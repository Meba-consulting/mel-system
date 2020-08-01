import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadPrograms(): Observable<any> {
    return this.httpClient.get(
      'programs.json?paging=false&fields=id,name,id,userGroupAccesses[*],programIndicators[id,name],name,dataEntryForm[id,name,htmlCode],programTrackedEntityAttributes[id,name,code,valueType],programStages[sortOrder,userGroupAccesses[*],id,name,dataEntryForm[id,htmlCode],programStageDataElements[dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]'
    );
  }
}
