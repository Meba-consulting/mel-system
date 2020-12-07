import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProgramsService } from 'src/app/core';
import {
  loadPrograms,
  addLoadedPrograms,
  loadingProgramsFail
} from '../actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { getAllPrograms } from '../selectors';

@Injectable()
export class ProgramsEffects {
  constructor(
    private actions$: Actions,
    private programsService: ProgramsService,
    private store: Store<State>
  ) {}

  programs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPrograms),
      withLatestFrom(this.store.select(getAllPrograms)),
      switchMap(([action, programs]: [any, any[]]) => {
        if (programs && programs.length > 0) {
          return from([]);
        } else {
          return this.programsService.loadPrograms().pipe(
            map(programs =>
              addLoadedPrograms({ programs: programs['programs'] })
            ),
            catchError(error => of(loadingProgramsFail({ error })))
          );
        }
      })
    )
  );
}
