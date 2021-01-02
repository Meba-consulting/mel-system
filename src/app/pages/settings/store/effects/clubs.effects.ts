import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { OuService } from 'src/app/core/services/ou.service';
import {
  addSavedClub,
  creatingClubFails,
  editClub,
  saveClub,
  setCurrentClub,
  updateClub,
} from '../actions';

@Injectable()
export class ClubsEffects {
  constructor(private actions$: Actions, private ouService: OuService) {}

  saveOu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveClub),
      switchMap((action) =>
        this.ouService.saveOu(action.clubDetails).pipe(
          mergeMap((response) => {
            window.indexedDB.deleteDatabase('iapps');
            return [
              addSavedClub({
                club: { ...action.clubDetails, id: response?.response?.uid },
              }),
              setCurrentClub({
                currentClub: {
                  ...action.clubDetails,
                  id: response?.response?.uid,
                },
              }),
            ];
          }),
          catchError((error) => of(creatingClubFails({ error })))
        )
      )
    )
  );

  editOu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editClub),
      switchMap((action) =>
        this.ouService.updateOu(action.club, action.id).pipe(
          mergeMap((response) => {
            window.indexedDB.deleteDatabase('iapps');
            return [
              updateClub({
                id: action.id,
                club: { ...action.club, id: action?.id },
              }),
              setCurrentClub({
                currentClub: {
                  ...action.club,
                  id: action.id,
                },
              }),
            ];
          }),
          catchError((error) => of(creatingClubFails({ error })))
        )
      )
    )
  );
}
