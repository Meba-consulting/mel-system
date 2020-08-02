import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataEntryService } from '../../services/data-entry.service';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadDataEntryFlow,
  addLoadedDataEntryFlow,
  loadingDataEntryFlowFails,
  loadProgramDataEntryFlowConfigs,
  addLoadedProgramDataEntryFlowConfigs,
  loadingProgramDataEntryFlowConfigsFails
} from '../actions';

@Injectable()
export class DataEntryFlowEffects {
  loadedDataEntryFlowConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDataEntryFlow),
      switchMap(() =>
        this.dataEntryService.getDataEntryFlow().pipe(
          map(dataEntryFlowConfigs =>
            addLoadedDataEntryFlow({
              dataEntryFlowConfigs
            })
          ),
          catchError(error => of(loadingDataEntryFlowFails({ error })))
        )
      )
    )
  );

  programDataEntryFlowCosnfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProgramDataEntryFlowConfigs),
      switchMap(action =>
        this.dataEntryService.getProgramDataEntryFlowConfigs(action.id).pipe(
          map(programEntryFlow =>
            addLoadedProgramDataEntryFlowConfigs({
              entryFlow: programEntryFlow
            })
          ),
          catchError(error =>
            of(loadingProgramDataEntryFlowConfigsFails({ error }))
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private dataEntryService: DataEntryService
  ) {}
}
