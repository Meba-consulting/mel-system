import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { EventsState, eventsAdapter } from '../states/events.states';

export const getEventsState: MemoizedSelector<
  object,
  EventsState
> = createFeatureSelector<EventsState>('events');

export const {
  selectEntities: getEventsEntities,
  selectAll: getEvents
} = eventsAdapter.getSelectors(getEventsState);

export const getEventsById = createSelector(
  getEventsEntities,
  (entities, props) => entities[props.id]
);
