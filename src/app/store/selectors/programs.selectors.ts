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

export const getReportById = createSelector(
  getProgramsEntities,
  (reportEntities, props) => reportEntities[props?.id] || null
);

export const getProgramsForGeneralReports = createSelector(
  getAllPrograms,
  (programs: any[]) => {
    return (
      programs.filter(
        (program) =>
          (
            program?.userGroupAccesses.filter(
              (userGroupAccess) =>
                userGroupAccess?.id === 'R0Jl6z5svOO' ||
                userGroupAccess.id === 'X4hULPKQDnn'
            ) || []
          ).length > 0
      ) || []
    ).map((program) => {
      return {
        ...program,
        type:
          program?.programType === 'WITHOUT_REGISTRATION'
            ? 'EVENT'
            : program?.programType === 'WITH_REGISTRATION'
            ? 'TRACKER'
            : 'AGGGRAGATE',
      };
    });
  }
);
