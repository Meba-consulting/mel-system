import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DynamicDimension } from '../models/dynamic-dimension.model';
import {
  DynamicDimensionActions,
  DynamicDimensionActionTypes
} from '../actions/dynamic-dimension.actions';
import { ErrorMessage } from '../../../../../../../models';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<DynamicDimension> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  loadInitiated: boolean;
  hasError: boolean;
  error: ErrorMessage;
  allowedDimensions: string[];
}

export const adapter: EntityAdapter<DynamicDimension> = createEntityAdapter<
  DynamicDimension
>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null,
  allowedDimensions: [
    'l2RYQfC9SfV',
    'VG4aAdXA4JI',
    'IymWT9V0HZI',
    'EaSVpHl8C4J',
    'X4NKFlvMewI'
  ]
});

export function reducer(
  state = initialState,
  action: DynamicDimensionActions
): State {
  switch (action.type) {
    case DynamicDimensionActionTypes.InitiateDynamicDimensions: {
      return { ...state, loadInitiated: true };
    }
    case DynamicDimensionActionTypes.AddDynamicDimensions: {
      return adapter.addMany(action.dynamicDimensions, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case DynamicDimensionActionTypes.LoadDynamicDimensions: {
      return {
        ...state,
        loading: state.loaded ? false : true,
        loaded: state.loaded,
        hasError: false,
        error: null
      };
    }

    default: {
      return state;
    }
  }
}

export const getDynamicDimensionState = createFeatureSelector<State>(
  'dynamicDimension'
);

export const { selectAll: getAllDynamicDimensions } = adapter.getSelectors(
  getDynamicDimensionState
);
