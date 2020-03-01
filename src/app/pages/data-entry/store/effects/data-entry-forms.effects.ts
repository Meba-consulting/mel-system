import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataEntryService } from '../../services/data-entry.service';
import {
  loadDataEntryFormsByOu,
  loadingFormsByOuFails,
  addSuccessLoadedFormsByOu
} from '../actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DataEntryFormsEffects {
  loadedDataEntryForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataEntryFormsByOu),
      switchMap(action =>
        this.dataEntryService.getFormsByOu(action.orgUnit).pipe(
          map(forms =>
            addSuccessLoadedFormsByOu({
              forms: forms
            })
          ),
          catchError(error => of(loadingFormsByOuFails({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dataEntryService: DataEntryService
  ) {}
}
