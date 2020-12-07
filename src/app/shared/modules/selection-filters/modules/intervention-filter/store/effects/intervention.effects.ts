import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { withLatestFrom, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { InterventionService } from '../../services/intervention.service';
import { State } from '../reducers/intervention.reducer';
import {
  InterventionActionTypes,
  LoadInterventions,
  LoadInterventionsInitiated,
  AddInterventions,
  LoadInterventionsFail
} from '../actions/intervention.actions';
import { getInterventionsInitiatedStatus } from '../selectors/intervention.selectors';

@Injectable()
export class InterventionEffects {
  @Effect({ dispatch: false })
  loadInterventions$: Observable<any> = this.actions$.pipe(
    ofType(InterventionActionTypes.LoadInterventions),
    withLatestFrom(
      this.interventionStore.select(getInterventionsInitiatedStatus)
    ),
    tap(([action, interventionInitiated]: [LoadInterventions, boolean]) => {
      if (!interventionInitiated) {
        this.interventionStore.dispatch(new LoadInterventionsInitiated());
        this.interventionService.loadAll().subscribe(
          (interventions: any[]) => {
            this.interventionStore.dispatch(
              new AddInterventions(interventions)
            );
          },
          (error: any) => {
            this.interventionStore.dispatch(new LoadInterventionsFail(error));
          }
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private interventionService: InterventionService,
    private interventionStore: Store<State>
  ) {}
}
