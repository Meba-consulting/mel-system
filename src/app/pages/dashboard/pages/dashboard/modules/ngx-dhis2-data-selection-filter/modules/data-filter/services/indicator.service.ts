import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({ providedIn: 'root' })
export class IndicatorService {
  constructor(private http: NgxDhis2HttpClientService) {}

  loadAll() {
    return this._loadFromApi();
  }

  private _loadFromApi() {
    /**
     * TODO: Load both program indicators and indicators
     */
    return this.http
      .get('programIndicators.json?fields=id,name,code&paging=false')
      .pipe(map((res) => res.programIndicators || []));
  }
}
