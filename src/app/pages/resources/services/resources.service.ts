import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  getResources(): Observable<any> {
    return this.httpClient.get('documents.json?fields=*&paging=false');
  }

  constructor(private httpClient: NgxDhis2HttpClientService) {}
}
