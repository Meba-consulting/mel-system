import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector,
  props
} from '@ngrx/store';
import { EventsState, eventsAdapter } from '../states/events.states';
import * as _ from 'lodash';

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

export const getFilesByKey = createSelector(
  getEventsState,
  (state: EventsState, props) => _.filter(state.files, { key: props.id })
);
