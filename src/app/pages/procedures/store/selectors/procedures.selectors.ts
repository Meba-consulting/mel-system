import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import {
  ProceduresState,
  proceduresAdapter
} from '../states/procedures.states';

export const getProceduresState: MemoizedSelector<
  object,
  ProceduresState
> = createFeatureSelector<ProceduresState>('procedures');

export const {
  selectEntities: getProceduresEntities,
  selectAll: getProcedures
} = proceduresAdapter.getSelectors(getProceduresState);

export const getProceduresConfigurations = createSelector(
  getProceduresState,
  (state: ProceduresState) => state.configurations
);

export const getProceduresByCategoryId = createSelector(
  getProceduresEntities,
  (entities, props) => entities[props.id]
);
