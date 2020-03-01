import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import {
  AddSystemInfo,
  LoadSystemInfoFail,
  SystemInfoActionTypes
} from '../actions/system-info.actions';
import {
  LoadCurrentUser,
  LoadSystemUsers,
  LoadingSystemUsersFail,
  AddSystemUsers,
  UserActionTypes
} from '../actions/user.actions';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { getSanitizedSystemInfo } from 'src/app/pages/dashboard/pages/helpers';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Router } from '@angular/router';

@Injectable()
export class SystemInfoEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private httpClient: NgxDhis2HttpClientService,
    private router: Router
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

  @Effect()
  loadSystemUsers$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadSystemUsers),
    switchMap(() =>
      this.httpClient
        .get('users.json?paging=false&fields=id,name,userCredentials[username]')
        .pipe(
          map(users => new AddSystemUsers(users)),
          catchError((error: any) => of(new LoadingSystemUsersFail(error)))
        )
    )
  );

  navigateTo() {
    this.store.dispatch(new LoadSystemUsers());
    if (this.router.url != '/') {
      this.router.navigate([this.router.url]);
    } else {
      this.router.navigate(['/dashboards']);
    }
  }
}
