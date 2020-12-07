import { createReducer, on } from '@ngrx/store';
import { initialResourcesState } from '../states/resources.states';
import {
  loadResources,
  addLoadedResources,
  loadingResourcesFail
} from '../actions';
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from 'src/app/store/states/base.state';

const reducer = createReducer(
  initialResourcesState,
  on(loadResources, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedResources, (state, { resources }) => ({
    ...state,
    resources,
    ...loadedBaseState
  })),
  on(loadingResourcesFail, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState
  }))
);

export function resourcesReducer(state, action) {
  return reducer(state, action);
}
