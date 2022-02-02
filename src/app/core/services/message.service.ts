import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  markAsRead(ids: string[]): Observable<any> {
    return this.httpClient.post('messageConversations/read', ids).pipe(
      map((response) => response),
      catchError((e) => of(e))
    );
  }

  createNewMessage(data): Observable<any> {
    return this.httpClient.post(`messageConversations`, data).pipe(
      map((response) => response),
      catchError((e) => of(e))
    );
  }

  saveMessageConversion(id: string, data: any): Observable<any> {
    return this.httpClient.post(`messageConversations/${id}?`, data).pipe(
      map((response) => response),
      catchError((e) => of(e))
    );
  }

  getMessageConversationsDetails(id: string): Observable<any[]> {
    return this.httpClient
      .get(`messageConversations/${id}?fields=*,messages[*,sender[*]]`)
      .pipe(
        map((response) => response),
        catchError((e) => of(e))
      );
  }

  getMessageConversations(type: string, read: boolean): Observable<any> {
    return this.httpClient
      .get(
        `messageConversations?filter=read:eq:${read}&filter=messageType:eq:${type}&fields=*,messages[*,sender[id,displayName]]`
      )
      .pipe(
        map((response) => response?.messageConversations),
        catchError((e) => of(e))
      );
  }
}
