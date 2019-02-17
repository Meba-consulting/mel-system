import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services';
import * as visualizationObjectActions from '../actions/visualization-object.action';

@Injectable()
export class OrganizationUnitGroupSetEffects {
  constructor(
    private actions$: Actions,
    private orgUnitService: fromServices.OrgUnitService
  ) {}

  @Effect()
  addOrgUnitGroupSet$ = this.actions$
    .ofType(visualizationObjectActions.ADD_ORGANIZATIONUNITGROUPSET)
    .pipe(
      switchMap(
        (action: visualizationObjectActions.AddOrgUnitGroupSetVizObj) => {
          const layerIds = [];
          const orgGroupIds = [];
          action.payload.layers.map(layer => {
            const orgGroupSet = layer.dataSelections.organisationUnitGroupSet;
            if (orgGroupSet && orgGroupSet.id) {
              layerIds.push(layer.id);
              orgGroupIds.push(orgGroupSet.id);
            }
          });
          const sources = orgGroupIds.length
            ? orgGroupIds.map(uid => {
                return this.orgUnitService.getOrganisationUnitGroupSets(uid);
              })
            : Observable.create([]);

          return combineLatest(sources).pipe(
            map(data => {
              let orgUnitGroupSet = {};
              if (data.length) {
                const groupSetObj = data.reduce((obj, cur, i) => {
                  obj[layerIds[i]] = cur;
                  return obj;
                }, {});
                orgUnitGroupSet = {
                  ...action.payload.analytics,
                  ...groupSetObj
                };
              }
              const vizObject = {
                ...action.payload,
                orgUnitGroupSet
              };
              return new visualizationObjectActions.UpdateVisualizationObjectSuccess(
                vizObject
              );
            }),
            catchError(error =>
              of(
                new visualizationObjectActions.UpdateVisualizationObjectFail(
                  error
                )
              )
            )
          );
        }
      )
    );
}
