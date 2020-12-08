import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { programsAdapter, ProgramsState } from '../states/programs.states';

const getProgramsState: MemoizedSelector<
  Object,
  ProgramsState
> = createFeatureSelector<ProgramsState>('programs');

export const {
  selectAll: getAllPrograms,
  selectEntities: getProgramsEntities,
} = programsAdapter.getSelectors(getProgramsState);

export const getProgramsLoadingState = createSelector(
  getProgramsState,
  (state: ProgramsState) => state.loading
);
