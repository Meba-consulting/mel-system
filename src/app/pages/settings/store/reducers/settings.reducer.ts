import { createReducer, on } from '@ngrx/store';
import {
  errorBaseState,
  loadedBaseState,
  loadingBaseState,
} from 'src/app/store/states/base.state';
import {
  addCreatedProgram,
  addLoadedPrograms,
  createProgram,
  creatingProgramFails,
  loadingProgramsFails,
  loadPrograms,
} from '../actions';
import {
  initialProgramsState,
  programsAdapter,
} from '../states/programs.states';

const reducer = createReducer(
  initialProgramsState,
  on(createProgram, (state) => ({
    ...state,
    ...loadingBaseState,
  })),
  on(addCreatedProgram, (state, { program }) =>
    programsAdapter.addOne(program, { ...state, ...loadedBaseState })
  ),
  on(creatingProgramFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
  })),
  on(loadPrograms, (state) => ({
    ...state,
    ...loadingBaseState,
  })),
  on(addLoadedPrograms, (state, { programs }) =>
    programsAdapter.addMany(programs, { ...state, ...loadedBaseState })
  ),
  on(loadingProgramsFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
  }))
);

export function programsReducer(state, action) {
  return reducer(state, action);
}
