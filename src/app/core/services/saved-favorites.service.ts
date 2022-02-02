import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SavedFavoritesService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getFavoritesDetails(id): Observable<any> {
    return this.httpClient.get(`eventReports/${id}.json?fields=*`).pipe(
      map((response) => {
        return {
          ...response,
          dataToRender: JSON.parse(response?.displayDescription),
        };
      }),
      catchError((error) => of(error))
    );
  }
}
