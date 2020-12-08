import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface ProgramsState extends BaseState, EntityState<any> {}

export const programsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialProgramsState = programsAdapter.getInitialState({
  ...initialBaseState,
});
