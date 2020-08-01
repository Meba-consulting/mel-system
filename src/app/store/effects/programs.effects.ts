import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProgramsService } from 'src/app/core';
import {
  loadPrograms,
  addLoadedPrograms,
  loadingProgramsFail
} from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProgramsEffects {
  constructor(
    private actions$: Actions,
    private programsService: ProgramsService
  ) {}

  programs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPrograms),
      switchMap(() =>
        this.programsService.loadPrograms().pipe(
          map(programs =>
            addLoadedPrograms({ programs: programs['programs'] })
          ),
          catchError(error => of(loadingProgramsFail({ error })))
        )
      )
    )
  );
}
