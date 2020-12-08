import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProgramsService } from '../../services/programs.service';
import {
  addCreatedProgram,
  addLoadedPrograms,
  createProgram,
  creatingProgramFails,
  loadingProgramsFails,
  loadPrograms,
} from '../actions';

@Injectable()
export class ProgramsEffects {
  createProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProgram),
      switchMap((action) => {
        return this.progamsService.createProgram(action.programDetails).pipe(
          map((response) => {
            return addCreatedProgram({ program: response });
          }),
          catchError((error) => {
            return of(creatingProgramFails({ error }));
          })
        );
      })
    )
  );

  programs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPrograms),
      switchMap(() => {
        return this.progamsService.getTrackerPrograms().pipe(
          map((response) => {
            return addLoadedPrograms({ programs: response['programs'] });
          }),
          catchError((error) => {
            return of(loadingProgramsFails({ error }));
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private progamsService: ProgramsService
  ) {}
}
