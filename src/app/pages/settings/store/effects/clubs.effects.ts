import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OuService } from 'src/app/core/services/ou.service';
import { addSavedClub, creatingClubFails, saveClub } from '../actions';

@Injectable()
export class ClubsEffects {
  constructor(private actions$: Actions, private ouService: OuService) {}

  saveOu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveClub),
      switchMap((action) =>
        this.ouService.saveOu(action.clubDetails).pipe(
          map((response) => {
            window.indexedDB.deleteDatabase('iapps');
            return addSavedClub({
              club: { ...action.clubDetails, id: response?.response?.uuid },
            });
          }),
          catchError((error) => of(creatingClubFails({ error })))
        )
      )
    )
  );
}
