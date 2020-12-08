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
    return this.httpClient.get('programs?paging=false&fields=id,name');
  }
}
