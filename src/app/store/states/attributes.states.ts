import { BaseState, initialBaseState } from './base.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface AttributesState extends BaseState, EntityState<any> {}

export const attributesAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialAttributesState = attributesAdapter.getInitialState({
  ...initialBaseState,
});
