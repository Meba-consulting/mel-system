import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { OldReportsState, oldReportsAdapter } from '../states/reports.states';

export const getOldReportsState: MemoizedSelector<
  object,
  OldReportsState
> = createFeatureSelector<OldReportsState>('oldReports');

export const {
  selectEntities: getOldReportsMetadataEntities,
  selectAll: getAllReportsWithMetadata
} = oldReportsAdapter.getSelectors(getOldReportsState);

export const getOldReportsList = createSelector(
  getOldReportsState,
  (state: OldReportsState) => state.reportsList
);

export const getOldReportMetadataLoadingState = createSelector(
  getOldReportsState,
  (state: OldReportsState) => state.loadingReportMetadata
);

export const getOldReportMetadataByReportId = createSelector(
  getOldReportsMetadataEntities,
  (entities, props) => entities[props.id]
);

export const getCountOfLoadedReportTypes = createSelector(
  getOldReportsState,
  (state: OldReportsState) => state.countOfReportsTypesLoaded
);

export const getResourcesLoadingState = createSelector(
  getOldReportsState,
  (state: OldReportsState) => state.loading
);

export const getResources = createSelector(
  getOldReportsState,
  (state: OldReportsState) => state.resources
);

export const getLoadedUserGroupsEntities = createSelector(
  getOldReportsState,
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
