import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/internal/operators';
import {
  AddCurrentUser,
  LoadCurrentUserFail,
  UserActionTypes,
  LoadCurrentUser,
  AddUserGroup,
  LoadingUserGroupFails,
} from '../actions/user.actions';
import { UserService } from 'src/app/pages/dashboard/pages/services';
import { User } from 'src/app/pages/dashboard/pages/models';
import { LoadDashboardSettingsAction } from 'src/app/pages/dashboard/pages/store/actions';
import { State } from '../reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getLoadedUserGroupsEntities } from '../selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>
  ) {}

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

  // @Effect()
  // currentUserLoaded$: Observable<any> = this.actions$.pipe(
  //   ofType(UserActionTypes.AddCurrentUser),
  //   map(
  //     (action: AddCurrentUser) =>
  //       new LoadDashboardSettingsAction(action.currentUser, action.systemInfo)
  //   )
  // );

  @Effect()
  userGroup$: Observable<any> = this.actions$.pipe(
    ofType(UserActionTypes.LoadUserGroup),
    withLatestFrom(this.store.select(getLoadedUserGroupsEntities)),
    switchMap(([action, userGroups]: [any, any]) => {
      if (userGroups[action.id]) {
        return from([]);
      } else {
        return this.userService.getUserGroup(action.id).pipe(
          map(
            (userGroup: any) => new AddUserGroup([userGroup]),
            catchError((error: any) => of(new LoadingUserGroupFails(error)))
          )
        );
      }
    })
  );
}
