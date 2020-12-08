import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DatastoreService } from '../../services/datastore.service';
import {
  addCreatedConfigs,
  addLoadedConfigs,
  createConfigsOnDataStore,
  creatingConfigsFails,
  loadDatastoreConfigs,
  loadingConfigsFails,
} from '../actions';

@Injectable()
export class DatastoreEffects {
  createConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createConfigsOnDataStore),
      switchMap((action) =>
        this.datastoreService.createConfigs(action.configs).pipe(
          map((response) => addCreatedConfigs({ configs: response })),
          catchError((error) => of(creatingConfigsFails({ error })))
        )
      )
    )
  );

  loadConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDatastoreConfigs),
      switchMap((action) =>
        this.datastoreService.getDatastoreConfigsByKey(action.id).pipe(
          map((response) => addLoadedConfigs({ configs: response })),
          catchError((error) =>
            of(
              loadingConfigsFails({
                error: { status: '404', message: 'Not found' },
              })
            )
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private datastoreService: DatastoreService
  ) {}
}
