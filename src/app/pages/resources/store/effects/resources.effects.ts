import { Injectable } from '@angular/core';
import { ResourcesService } from '../../services/resources.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  loadResources,
  addLoadedResources,
  loadingResourcesFail
} from '../actions';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getResources } from '../selectors/resources.selector';

@Injectable()
export class ResourcesEffects {
  resources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadResources),
      switchMap(action =>
        //{
        // if (resources && resources.length > 0 && !action.reload) {
        //   return from([]);
        // } else {
        //   return
        // }
        //return
        //}
        this.resourceService.getResources().pipe(
          map(documents =>
            addLoadedResources({ resources: documents['documents'] })
          ),
          catchError(error => of(loadingResourcesFail({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private resourceService: ResourcesService,
    private store: Store<State>
  ) {}
}
