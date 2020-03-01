import { Injectable } from "@angular/core";
import { GetResourcesService } from "../../services/get-resources.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {
  loadProceduresConfigurations,
  addLoadedProceduresConfigurations,
  loadingProceduresConfigurationsFail,
  loadDocuments,
  addLoadedDocuments
} from "../actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProceduresEffect {
  constructor(
    private resourcesService: GetResourcesService,
    private actions$: Actions
  ) {}

  proceduresConfigs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProceduresConfigurations),
      switchMap(() =>
        this.resourcesService.getConfigurations().pipe(
          map(proceduresConfigs =>
            addLoadedProceduresConfigurations({ proceduresConfigs })
          ),
          catchError((error: any) =>
            of(loadingProceduresConfigurationsFail({ error }))
          )
        )
      )
    )
  );

  procedures$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDocuments),
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
