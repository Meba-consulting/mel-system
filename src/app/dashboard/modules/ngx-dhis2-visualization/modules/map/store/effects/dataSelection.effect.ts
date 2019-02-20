import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as dataSelectionAction from '../actions/data-selection.action';
import * as visualizationObjectActions from '../actions/visualization-object.action';

@Injectable()
export class DataSelectionEffects {
  constructor(
    private actions$: Actions,
    private geofeatureService: fromServices.GeoFeatureService
  ) {}

  @Effect({ dispatch: false })
  updatePe$ = this.actions$.pipe(
    ofType(dataSelectionAction.UPDATE_PE_SELECTION),
    map((action: dataSelectionAction.UpdatePESelection) => {
      const payload = action.payload;
    }),
    catchError(error =>
      of(new visualizationObjectActions.UpdateVisualizationObjectFail(error))
    )
  );

  @Effect({ dispatch: false })
  updateDx$ = this.actions$.pipe(
    ofType(dataSelectionAction.UPDATE_DX_SELECTION),
    map((action: dataSelectionAction.UpdateDXSelection) => {
      const payload = action.payload;
    }),
    catchError(error =>
      of(new visualizationObjectActions.UpdateVisualizationObjectFail(error))
    )
  );

  @Effect()
  updateOu$ = this.actions$.pipe(
    ofType(dataSelectionAction.UPDATE_OU_SELECTION),
    map((action: dataSelectionAction.UpdateDXSelection) => action.payload),
    switchMap(payload => {
      const { componentId, layer, params } = payload;
      const requestParam = `ou=ou:${params}&displayProperty=NAME`;
      return this.geofeatureService.getGeoFeatures(requestParam).pipe(
        map(
          value =>
            new visualizationObjectActions.UpdateGeoFeatureVizObj({
              componentId,
              geofeature: { [layer.id]: value }
            })
        ),
        catchError(error =>
          of(
            new visualizationObjectActions.UpdateVisualizationObjectFail(error)
          )
        )
      );
    })
  );
}
