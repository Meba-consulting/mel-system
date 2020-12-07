import { BaseState, initialBaseState } from './base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProgramsState extends BaseState, EntityState<any> {}

export const programsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialProgramsState = programsAdapter.getInitialState({
  ...initialBaseState
});
