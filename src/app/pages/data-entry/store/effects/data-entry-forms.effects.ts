import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataEntryService } from '../../services/data-entry.service';
import {
  loadDataEntryFormsByOu,
  loadingFormsByOuFails,
  addSuccessLoadedFormsByOu,
  loadProgramMetadata,
  addLoadedProgramMetadata,
  loadingProgramMetadataFails
} from '../actions';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { getAllProgramMetadata } from '../selectors';
import * as _ from 'lodash';

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

  programMetadata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProgramMetadata),
      switchMap(action =>
        this.dataEntryService.getProgramMetadata(action.programId).pipe(
          map(programMetadata =>
            addLoadedProgramMetadata({
              programMetadata: programMetadata['programs']
            })
          ),
          catchError(error => of(loadingProgramMetadataFails({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dataEntryService: DataEntryService
  ) {}
}
