import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadContactsPageDesign,
  addContactsPageDesign,
  loadingContactsPageDesignFail
} from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContactsPageService } from '../../services/contacts-page.service';

@Injectable()
export class ContactsPageEffects {
  contactsPageDesign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContactsPageDesign),
      switchMap(action =>
        this.contactsPageService.loadContactsPageDesign().pipe(
          map(htmlCode => addContactsPageDesign({ htmlCode })),
          catchError(error => of(loadingContactsPageDesignFail(error)))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private contactsPageService: ContactsPageService
  ) {}
}
