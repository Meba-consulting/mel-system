import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomePageService } from '../../services/home-page.service';
import {
  loadHomePageDesign,
  addHomePageDesign,
  loadingHomePageDesignFail
} from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class HomePageEffects {
  homePageDesign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHomePageDesign),
      switchMap(action =>
        this.homePageService.loadHomePageDesign().pipe(
          map(htmlCode => addHomePageDesign({ htmlCode })),
          catchError(error => of(loadingHomePageDesignFail(error)))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private homePageService: HomePageService
  ) {}
}
