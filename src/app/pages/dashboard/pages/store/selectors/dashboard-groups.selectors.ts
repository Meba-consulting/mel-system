import {
  createSelector,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import {
  getDashboardGroupsLoadedState,
  getDashboardGroupsLoadingState,
  getActiveDashboardGroupState,
  DashboardGroupsAdapter
} from '../reducers/dashboard-groups.reducer';

export const getDashboardGroupEntityState: MemoizedSelector<
  object,
  any
> = createFeatureSelector<any>('dashboardGroups');

// export const getDashboardGroupEntityState = createSelector(getRootState, (state: State) => state.dashboardGroups);

export const {
  selectIds: getDashboardGroupsIds,
  selectEntities: getDashboardGroupsEntities,
  selectAll: getAllDashboardGroups,
  selectTotal: getTotalDashboardGroups
} = DashboardGroupsAdapter.getSelectors(getDashboardGroupEntityState);

export const getDashboardGroupsLoaded = createSelector(
  getDashboardGroupEntityState,
  getDashboardGroupsLoadedState
);

export const getDashboardGroupsLoading = createSelector(
  getDashboardGroupEntityState,
  getDashboardGroupsLoadingState
);

export const getActiveDashboardGroup = createSelector(
  getDashboardGroupEntityState,
  getActiveDashboardGroupState
);

export const getCurrentDashboardGroup = createSelector(
  getDashboardGroupsEntities,
  getActiveDashboardGroup,
  (dashboardGroupsEntities, activeDashboardId) =>
    dashboardGroupsEntities[activeDashboardId]
);
