import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import {
  AddSystemInfo,
  LoadSystemInfoFail,
  SystemInfoActionTypes
} from '../actions/system-info.actions';
import { LoadCurrentUser } from '../actions/user.actions';
import { getSanitizedSystemInfo } from '../../helpers';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable()
export class SystemInfoEffects {
  constructor(
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  @Effect()
  loadSystemInfo$: Observable<any> = this.actions$.pipe(
    ofType(SystemInfoActionTypes.LoadSystemInfo),
    switchMap(() =>
      this.httpClient.systemInfo().pipe(
        map(
          (systemInfo: any) =>
            new AddSystemInfo(getSanitizedSystemInfo(systemInfo))
        ),
        catchError((error: any) => of(new LoadSystemInfoFail(error)))
      )
    )
  );

  @Effect()
  systemInfoLoaded$: Observable<any> = this.actions$.pipe(
    ofType(SystemInfoActionTypes.AddSystemInfo),
    map((action: AddSystemInfo) => new LoadCurrentUser(action.systemInfo))
  );
}
