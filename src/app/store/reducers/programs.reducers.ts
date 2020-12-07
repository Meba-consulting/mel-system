import { createReducer, on } from '@ngrx/store';
import {
  initialProgramsState,
  programsAdapter
} from '../states/programs.states';
import {
  loadPrograms,
  addLoadedPrograms,
  loadingProgramsFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from '../states/base.state';

const reducer = createReducer(
  initialProgramsState,
  on(loadPrograms, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedPrograms, (state, { programs }) =>
    programsAdapter.addMany(programs, { ...state, ...loadedBaseState })
  ),
  on(loadingProgramsFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
    ...loadedBaseState
  }))
);

export function programsReducer(state, action) {
  return reducer(state, action);
}
