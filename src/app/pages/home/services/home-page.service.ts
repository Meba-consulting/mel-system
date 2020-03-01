import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadHomePageDesign(): Observable<any> {
    return this.httpClient.get('dataStore/pages-design/home-htmlCodes');
  }
}
