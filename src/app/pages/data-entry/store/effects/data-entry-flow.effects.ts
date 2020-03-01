import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataEntryService } from '../../services/data-entry.service';

import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadDataEntryFlow,
  addLoadedDataEntryFlow,
  loadingDataEntryFlowFails
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
  constructor(
    private actions$: Actions,
    private dataEntryService: DataEntryService
  ) {}
}
