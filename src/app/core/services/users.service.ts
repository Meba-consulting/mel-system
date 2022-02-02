import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getUsersFromLookUp(q: string): Observable<any> {
    return this.httpClient.get(`userLookup?query=${q}`).pipe(
      map((response) => response?.users),
      catchError((error) => of(error))
    );
  }
}
