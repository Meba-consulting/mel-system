import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BaseState, initialBaseState } from 'src/app/store/states/base.state';

export interface DatastoreState extends BaseState, EntityState<any> {}

export const datastoreAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialDatastoreState = datastoreAdapter.getInitialState({
  ...initialBaseState,
});
