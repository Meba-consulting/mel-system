import { Injectable } from '@angular/core';
import { UserGroupsService } from 'src/app/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadUserGroups,
  addLoadedUserGroups,
  loadingUserGroupsFail
} from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserGroupsEffects {
  constructor(
    private userGroupsService: UserGroupsService,
    private actions$: Actions
  ) {}

  userGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserGroups),
      switchMap(() =>
        this.userGroupsService.loadUserGroups().pipe(
          map(userGroups =>
            addLoadedUserGroups({ userGroups: userGroups['userGroups'] })
          ),
          catchError(error => of(loadingUserGroupsFail({ error })))
        )
      )
    )
  );
}
