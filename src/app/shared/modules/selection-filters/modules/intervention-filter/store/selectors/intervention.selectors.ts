import { createSelector, createFeatureSelector } from '@ngrx/store';

import { adapter, State } from '../reducers/intervention.reducer';

const getInterventionState = createFeatureSelector<State>('intervention');

export const {
  selectEntities: getInterventionEntities,
  selectAll: getAllInterventions
} = adapter.getSelectors(getInterventionState);

export const getInterventionsInitiatedStatus = createSelector(
  getInterventionState,
  (state: State) => state.loadInitiated
);

export const getInterventionsLoadingStatus = createSelector(
  getInterventionState,
  (state: State) => state.loading
);

export const getInterventions = (selectedInterventions: any[]) =>
  createSelector(
    getAllInterventions,
    (interventions: any[]) =>
      (interventions || []).filter(
        (intervention: any) =>
          !(selectedInterventions || []).find(
            (selectedIntervention: any) =>
              selectedIntervention.id === intervention.id
          )
      )
  );
