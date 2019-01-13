import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@hisptz/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DynamicDimensionService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  loadAll() {
    return this.httpClient
      .get(
        'dimensions.json?fields=id,displayShortName~rename(name),dimensionType,items[id,name,dimensionType]&paging=false',
        {
          useIndexDb: true,
          indexDbConfig: {
            schema: { name: 'dynamic-dimension', keyPath: 'id' },
            arrayKey: 'dimensions'
          }
        }
      )
      .pipe(map((res: any) => res.dimensions || []));
  }
}
