import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataEntryService } from '../../services/data-entry.service';
import { loadEvents, addLoadedEvents, loadingEventsFails } from '../actions';
import { switchMap, mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';

@Injectable()
export class EventsEffects {
  events$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEvents),
      switchMap(action =>
        from(action.dataDimenions).pipe(
          mergeMap(dimensionDefns =>
            this.dataEntryService.loadEvents(dimensionDefns).pipe(
              map(eventsLoaded =>
                addLoadedEvents({
                  events: {
                    id: dimensionDefns.ou + '-' + dimensionDefns.stage,
                    data: eventsLoaded
                  }
                })
              ),
              catchError(error => of(loadingEventsFails({ error })))
            )
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
