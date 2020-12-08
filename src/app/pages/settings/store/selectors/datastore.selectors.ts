import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
  props,
} from '@ngrx/store';
import { datastoreAdapter, DatastoreState } from '../states/datastore.states';

const getDatastoreState: MemoizedSelector<
  Object,
  DatastoreState
> = createFeatureSelector<DatastoreState>('datastore');

const {
  selectAll: getAllDatastoreConfigs,
  selectEntities: getDatastoreEntities,
} = datastoreAdapter.getSelectors(getDatastoreState);

export const getDatastoreConfigsById = createSelector(
  getDatastoreEntities,
  (entities, props) => entities[props?.id]
);
