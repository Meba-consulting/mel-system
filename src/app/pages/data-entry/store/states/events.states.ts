import { BaseState, initialBaseState } from 'src/app/store/states/base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface EventsState extends BaseState, EntityState<any> {}

export const eventsAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialEventsState = eventsAdapter.getInitialState({
  ...initialBaseState
});
