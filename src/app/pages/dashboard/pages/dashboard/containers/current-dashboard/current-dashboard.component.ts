import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Dashboard, DashboardGroups } from '../../models';
import {
  getCurrentDashboard,
  getDashboardObjectLoading,
  getDashboardObjectLoaded,
  getVisualizationReady,
  getCurrentDashboardVisualizationItems,
  getCurrentDashboardVisualizationLoading,
  getCurrentDashboardVisualizationLoaded,
  getCurrentDashboardGroup,
  getDashboardGroupsLoaded,
  getDashboardGroupsLoading,
  getCurrentGlobalDataSelections,
  getCurrentDashboardVisualizationLoadingProgress,
  getCurrentDashboardSingleValueVisualizationItems,
} from '../../../store/selectors';
import { User, SystemInfo, LegendSet } from '../../../models';
import { take } from 'rxjs/operators';

import {
  WELCOMING_DESCRIPTION,
  WELCOMING_TITLE,
} from '../../constants/welcoming-messages.constants';
import { State, getCurrentUser, getAllLegendSets } from 'src/app/store';
import { getSystemInfo } from 'src/app/store/selectors/system-info.selectors';
import {
  ToggleDashboardBookmarkAction,
  ManageDashboardItemAction,
  AddNewUnsavedFavoriteAction,
  SetCurrentVisualizationAction,
  GlobalFilterChangeAction,
} from '../../../store/actions';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./current-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentDashboardComponent implements OnInit {
  currentDashboardVisualizationItems$: Observable<any[]>;
  currentDashboardVisualizationLoading$: Observable<boolean>;
  currentDashboardVisualizationLoaded$: Observable<boolean>;
  currentDashboard$: Observable<Dashboard>;
  currentDashboardGroup$: Observable<DashboardGroups>;
  currentUser$: Observable<User>;
  systemInfo$: Observable<SystemInfo>;
  dashboardLoading$: Observable<boolean>;
  dashboardGroupsLoading$: Observable<boolean>;
  dashboardLoaded$: Observable<boolean>;
  dashboardGroupsLoaded$: Observable<boolean>;
  visualizationsReady$: Observable<boolean>;
  legendSets$: Observable<LegendSet[]>;
  currentGlobalDataSelections$: Observable<any>;
  visualizationProgress$: Observable<any>;
  progressMessages$: Observable<any>;

  welcomingTitle: string;
  welcomingDescription: string;
  emptyVisualizationMessage: string;

  singleValueDashboardItems$: Observable<any[]>;

  constructor(private store: Store<State>) {
    this.singleValueDashboardItems$ = store.select(
      getCurrentDashboardSingleValueVisualizationItems
    );
    this.currentDashboardVisualizationItems$ = store.select(
      getCurrentDashboardVisualizationItems
    );

    this.currentDashboardVisualizationLoading$ = store.select(
      getCurrentDashboardVisualizationLoading
    );

    this.currentDashboardVisualizationLoaded$ = store.select(
      getCurrentDashboardVisualizationLoaded
    );

    this.currentDashboard$ = store.select(getCurrentDashboard);
    this.currentDashboardGroup$ = store.select(getCurrentDashboardGroup);
    this.currentUser$ = store.select(getCurrentUser);
    this.systemInfo$ = store.select(getSystemInfo);
    this.dashboardLoading$ = store.select(getDashboardObjectLoading);
    this.dashboardGroupsLoading$ = store.select(getDashboardGroupsLoading);
    this.dashboardLoaded$ = store.select(getDashboardObjectLoaded);
    this.dashboardGroupsLoaded$ = store.select(getDashboardGroupsLoaded);
    this.visualizationsReady$ = store.select(getVisualizationReady);
    this.legendSets$ = store.select(getAllLegendSets);
    this.visualizationProgress$ = store.select(
      getCurrentDashboardVisualizationLoadingProgress
    );

    this.currentGlobalDataSelections$ = store.select(
      getCurrentGlobalDataSelections
    );

    this.progressMessages$ = this.store.select(
      getCurrentDashboardVisualizationLoadingProgress
    );

    this.welcomingTitle = WELCOMING_TITLE;
    this.welcomingDescription = WELCOMING_DESCRIPTION;
    this.emptyVisualizationMessage =
      'There are no items on this dashboard, search for charts, tables and add them to your dashboard';
  }

  ngOnInit() {}

  onToggleCurrentDashboardBookmark(dashboardDetails: {
    id: string;
    supportBookmark: boolean;
    bookmarked: boolean;
  }) {
    this.store.dispatch(
      new ToggleDashboardBookmarkAction(
        dashboardDetails.id,
        dashboardDetails.supportBookmark,
        {
          bookmarked: dashboardDetails.bookmarked,
          bookmarkPending: true,
        }
      )
    );
  }

  onAddDashboardItem(dashboardFavoriteDetails: {
    dashboardId: string;
    dashboardItem: any;
  }) {
    this.store.dispatch(
      new ManageDashboardItemAction(
        dashboardFavoriteDetails.dashboardId,
        dashboardFavoriteDetails.dashboardItem,
        'ADD'
      )
    );
  }

  onCreateFavoriteForCurrentDashboard(dashboardId: string) {
    this.store.dispatch(new AddNewUnsavedFavoriteAction(dashboardId));
  }

  onToggleVisualizationFullScreen(fullScreenDetails) {
    this.store.dispatch(
      new SetCurrentVisualizationAction(
        fullScreenDetails.id,
        fullScreenDetails.dashboardId
      )
    );
  }

  onGlobalFilterChange(globalFilterDetails: any) {
    this.store.dispatch(
      new GlobalFilterChangeAction(globalFilterDetails.id, {
        globalSelections: globalFilterDetails.globalSelections,
      })
    );
  }

  onDeleteVisualizationAction(visualizationDetails: any) {
    this.currentDashboard$.pipe(take(1)).subscribe((dashboard: Dashboard) => {
      this.store.dispatch(
        new ManageDashboardItemAction(
          dashboard.id,
          {
            id: visualizationDetails.visualization.id,
            favorite: visualizationDetails.visualization.favorite,
            deleteFavorite: visualizationDetails.deleteFavorite,
            isNew: visualizationDetails.visualization.isNew,
          },
          'DELETE'
        )
      );
    });
  }
}
