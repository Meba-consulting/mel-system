import {
  LegendSetActions,
  LegendSetActionTypes
} from '../actions/legend-set.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LegendSet } from 'src/app/pages/dashboard/pages/models';

export interface LegendSetState extends EntityState<LegendSet> {
  loading: boolean;
  loaded: boolean;
}

export const LegendSetAdapter: EntityAdapter<LegendSet> = createEntityAdapter<
  LegendSet
>();

const initialState: LegendSetState = LegendSetAdapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false
});

export function legendSetReducer(
  state = initialState,
  action: LegendSetActions
): LegendSetState {
  switch (action.type) {
    case LegendSetActionTypes.LoadLegendSetSuccess: {
      return LegendSetAdapter.addMany(action.payload, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    default: {
      return state;
    }
  }
}

export const getLegendSetLoadedState = (state: LegendSetState) => state.loaded;
export const getLegendSetLoadingState = (state: LegendSetState) =>
  state.loading;
