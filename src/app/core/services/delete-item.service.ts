import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeleteItemService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  deleteItem(deletePath): Observable<any> {
    return this.httpClient.delete(deletePath).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
