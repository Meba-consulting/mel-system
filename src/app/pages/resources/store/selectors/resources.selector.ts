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

export const getLoadedUserGroupsEntities = createSelector(
  getResourcesState,
  (state: any) =>
    state.resources.reduce(
      (resources, resource) => ({
        ...resources,
        [resource.id]: resource
      }),
      {}
    )
);

export const getResourceById = createSelector(
  getLoadedUserGroupsEntities,
  (entities, props) => entities[props.id]
);
