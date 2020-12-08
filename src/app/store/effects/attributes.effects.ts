import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { SettingsService } from 'src/app/core/services/settings.service';
import { addLoadedAttributes, loadAttributes } from '../actions';

@Injectable()
export class AttributesEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) {}

  attributes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAttributes),
      switchMap(() =>
        this.settingsService
          .getAttributes()
          .pipe(
            map((response) =>
              addLoadedAttributes({ attributes: response['attributes'] })
            )
          )
      )
    )
  );
}
