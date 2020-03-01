import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import {
  AddCurrentUser,
  LoadCurrentUserFail,
  UserActionTypes,
  LoadCurrentUser
} from '../actions/user.actions';
import { UserService } from 'src/app/pages/dashboard/pages/services';
import { User } from 'src/app/pages/dashboard/pages/models';
import { LoadDashboardSettingsAction } from 'src/app/pages/dashboard/pages/store';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  loadCurrentUser$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadCurrentUser),
    switchMap((action: LoadCurrentUser) =>
      this.userService.loadCurrentUser().pipe(
        map((user: User) => new AddCurrentUser(user, action.systemInfo)),
        catchError((error: any) => of(new LoadCurrentUserFail(error)))
      )
    )
  );

  @Effect()
  currentUserLoaded$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.AddCurrentUser),
    map(
      (action: AddCurrentUser) =>
        new LoadDashboardSettingsAction(action.currentUser, action.systemInfo)
    )
  );
}
