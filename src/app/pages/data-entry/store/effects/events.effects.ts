import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataEntryService } from '../../services/data-entry.service';
import {
  loadEvents,
  addLoadedEvents,
  loadingEventsFails,
  loadFileResources,
  addLoadedFileResource
} from '../actions';
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

  fileResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFileResources),
      switchMap(action =>
        from(action.dimensions).pipe(
          mergeMap(dimension =>
            this.dataEntryService.getFileResource(dimension.id).pipe(
              map(file =>
                addLoadedFileResource({
                  file: Object.assign(file, {
                    key: action.key,
                    eventUid: dimension.eventUid,
                    dataElementUid: dimension.dataElementUid,
                    status: dimension.status,
                    currentGroupActed: dimension.currentGroupActed,
                    currentGroupIdActed: dimension.currentGroupIdActed
                  })
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
