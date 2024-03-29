import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InterpretationsService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  saveInterpretation(
    itemType: string,
    itemId: string,
    queryParams: any,
    data: any
  ): Observable<any> {
    const url =
      itemType === 'dataSetReport'
        ? `interpretations/${itemType}/${itemId}?${queryParams}`
        : `interpretations/eventReport/${itemId}`;
    return this.httpClient.post(url, data).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => of(error))
    );
  }

  getAllInterpretations(): Observable<any[]> {
    return this.httpClient.get('interpretations?fields=*,comments[*]').pipe(
      map((response) => response?.interpretations),
      catchError((e) => of(e))
    );
  }

  getIntepretationsForSpecificReport(
    itemType: string,
    itemId: string,
    pe: string,
    ou: string
  ): Observable<any> {
    if (itemType === 'dataSetReport') {
      return this.httpClient
        .get(
          `interpretations.json?paging=false&fields=id,text,*,comments[*],dataSet&filter=dataSet.id:in:[${itemId}]&filter=period.id:eq:${pe}&filter=organisationUnit.id:eq:${ou}`
        )
        .pipe(
          map((response) => response?.interpretations),
          catchError((error) => of(error))
        );
    } else if (itemType === 'eventReport') {
      return this.httpClient
        .get(
          `interpretations.json?fields=*,comments[*],eventReport&filter=eventReport.id:in:[${itemId}]`
        )
        .pipe(
          map((response) => response?.interpretations),
          catchError((error) => of(error))
        );
    } else {
      return of(null);
    }
  }

  saveComment(id: string, data: string): Observable<any> {
    return this.httpClient.post(`interpretations/${id}/comments`, data).pipe(
      map((response) => response),
      catchError((error) => of(error))
    );
  }
}
