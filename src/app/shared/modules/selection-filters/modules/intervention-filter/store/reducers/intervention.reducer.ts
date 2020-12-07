import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Intervention } from '../../models/intervention.model';
import {
  InterventionActions,
  InterventionActionTypes
} from '../actions/intervention.actions';

export interface State extends EntityState<Intervention> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
}

export const adapter: EntityAdapter<Intervention> = createEntityAdapter<
  Intervention
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null
});

export function reducer(
  state = initialState,
  action: InterventionActions
): State {
  switch (action.type) {
    case InterventionActionTypes.LoadInterventionsInitiated: {
      return { ...state, loadInitiated: true };
    }
    case InterventionActionTypes.AddIntervention: {
      return adapter.addOne(action.payload.intervention, state);
    }

    case InterventionActionTypes.UpsertIntervention: {
      return adapter.upsertOne(action.payload.intervention, state);
    }

    case InterventionActionTypes.AddInterventions: {
      return adapter.addMany(action.interventions || [], {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case InterventionActionTypes.UpsertInterventions: {
      return adapter.upsertMany(action.payload.interventions, state);
    }

    case InterventionActionTypes.UpdateIntervention: {
      return adapter.updateOne(action.payload.intervention, state);
    }

    case InterventionActionTypes.UpdateInterventions: {
      return adapter.updateMany(action.payload.interventions, state);
    }

    case InterventionActionTypes.DeleteIntervention: {
      return adapter.removeOne(action.payload.id, state);
    }

    case InterventionActionTypes.DeleteInterventions: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case InterventionActionTypes.LoadInterventions: {
      return {
        ...state,
        loading: state.loaded ? false : true,
        loaded: state.loaded,
        hasError: false,
        error: null
      };
    }

    case InterventionActionTypes.ClearInterventions: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
