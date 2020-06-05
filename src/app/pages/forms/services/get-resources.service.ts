import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetResourcesService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getDocuments(documents): Observable<any> {
    return this.httpClient.get(
      'documents.json?paging=false&fields=id,name,url,*&filter=id:in:[' +
        documents +
        ']'
    );
  }

  getConfigurations(): Observable<any> {
    return this.httpClient.get('dataStore/documents/forms');
  }
}
