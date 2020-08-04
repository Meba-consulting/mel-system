import { createReducer, on } from '@ngrx/store';
import { initialEventsState, eventsAdapter } from '../states/events.states';
import {
  loadEvents,
  addLoadedEvents,
  loadingEventsFails,
  loadFileResources,
  addLoadedFileResource
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

export const reducer = createReducer(
  initialEventsState,
  on(loadEvents, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedEvents, (state, { events }) =>
    eventsAdapter.addOne(events, { ...state, ...loadedBaseState })
  ),
  on(loadingEventsFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  })),
  on(loadFileResources, state => ({
    ...state
  })),
  on(addLoadedFileResource, (state, { file }) => ({
    ...state,
    files: [...state.files, file]
  }))
);

export function eventsReducer(state, action) {
  return reducer(state, action);
}
