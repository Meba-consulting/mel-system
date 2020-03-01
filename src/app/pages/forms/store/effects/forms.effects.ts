import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
  loadFormsConfigurations,
  addLoadedFormsConfigurations,
  loadingFormsConfigurationsFail,
  loadFormsDocuments,
  addLoadedDocuments
} from "../actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { GetResourcesService } from "../../services/get-resources.service";

@Injectable()
export class FormsEffect {
  constructor(
    private resourcesService: GetResourcesService,
    private actions$: Actions
  ) {}

  proceduresConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFormsConfigurations),
      switchMap(() =>
        this.resourcesService.getConfigurations().pipe(
          map(formsConfigs => addLoadedFormsConfigurations({ formsConfigs })),
          catchError((error: any) =>
            of(loadingFormsConfigurationsFail({ error }))
          )
        )
      )
    )
  );

  procedures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFormsDocuments),
      switchMap(action =>
        this.resourcesService.getDocuments(action.documents.docIds).pipe(
          map(data =>
            addLoadedDocuments({
              documentsInfo: {
                id: action.documents.id,
                documents: data.documents
              }
            })
          )
        )
      )
    )
  );
}
