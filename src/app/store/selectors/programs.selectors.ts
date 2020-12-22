import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { programsAdapter, ProgramsState } from '../states/programs.states';

export const getProgramsState = createSelector(
  getRootState,
  (state: State) => state.programs
);

export const {
  selectAll: getAllPrograms,
  selectEntities: getProgramsEntities,
  selectIds: getProgramsIds,
  selectTotal: getTotalLoadedPrograms,
} = programsAdapter.getSelectors(getProgramsState);

export const getProgramById = createSelector(
  getProgramsEntities,
  (entities, props) => entities[props.id]
);

export const getProgramsLoadedState = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.loaded
);
