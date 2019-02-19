import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as layersActions from '../actions/layers.action';

@Injectable()
export class LayersEffects {
  constructor(
    private actions$: Actions,
    private layerService: fromServices.LayerService
  ) {}

  @Effect()
  createLayers$ = this.actions$.pipe(
    ofType(layersActions.CREATE_LAYERS),
    map(
      (action: layersActions.CreateLayers) =>
        new layersActions.LoadLayersSuccess(action.payload)
    ),
    catchError(error => of(new layersActions.LoadLayersFail(error)))
  );
}
