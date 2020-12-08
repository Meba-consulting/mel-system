import { createReducer, on } from '@ngrx/store';
import {
  errorBaseState,
  initialBaseState,
  loadedBaseState,
  loadingBaseState,
} from 'src/app/store/states/base.state';
import {
  addCreatedConfigs,
  addLoadedConfigs,
  createConfigsOnDataStore,
  creatingConfigsFails,
  loadDatastoreConfigs,
  loadingConfigsFails,
} from '../actions';
import {
  datastoreAdapter,
  initialDatastoreState,
} from '../states/datastore.states';

const reducer = createReducer(
  initialDatastoreState,
  on(createConfigsOnDataStore, (state) => ({
    ...state,
    ...initialBaseState,
  })),
  on(addCreatedConfigs, (state, { configs }) =>
    datastoreAdapter.addOne(configs, { ...state, ...loadedBaseState })
  ),
  on(creatingConfigsFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
  })),
  on(loadDatastoreConfigs, (state) => ({
    ...state,
    ...loadingBaseState,
  })),
  on(addLoadedConfigs, (state, { configs }) =>
    datastoreAdapter.addOne(configs, { ...state, ...loadedBaseState })
  ),
  on(loadingConfigsFails, (state, { error }) => ({
    ...state,
    error,
    ...errorBaseState,
  }))
);

export function datastoreReducer(state, action) {
  return reducer(state, action);
}
