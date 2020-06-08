import {
  createFeatureSelector,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import { ResourcesState } from '../states/resources.states';

const getResourcesState: MemoizedSelector<
  object,
  ResourcesState
> = createFeatureSelector<ResourcesState>('resources');

export const getResourcesLoadingState = createSelector(
  getResourcesState,
  (state: ResourcesState) => state.loading
);

export const getResources = createSelector(
  getResourcesState,
  (state: ResourcesState) => state.resources
);
