import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getCurrentVisualizationId,
  getCurrentDashboardId,
  getCurrentDashboardVisualizationLoading,
  getCurrentDashboardVisualizationLoaded
} from '../../../store/selectors';
import { Observable } from 'rxjs';
import { User, SystemInfo } from '../../../models';
import { State, getCurrentUser } from 'src/app/store';
import { getSystemInfo } from 'src/app/store/selectors/system-info.selectors';
import { SetCurrentDashboardAction } from '../../../store/actions';

@Component({
  selector: 'app-current-dashboard-visualization',
  templateUrl: './current-dashboard-visualization.component.html',
  styleUrls: ['./current-dashboard-visualization.component.scss']
})
export class CurrentDashboardVisualizationComponent implements OnInit {
  currentVisualizationId$: Observable<string>;
  currentDashboardId$: Observable<string>;
  currentUser$: Observable<User>;
  systemInfo$: Observable<SystemInfo>;
  currentDashboardVisualizationLoading$: Observable<boolean>;
  currentDashboardVisualizationLoaded$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.currentVisualizationId$ = this.store.select(getCurrentVisualizationId);
    this.currentDashboardId$ = this.store.select(getCurrentDashboardId);
    this.currentUser$ = store.select(getCurrentUser);
    this.systemInfo$ = store.select(getSystemInfo);

    this.currentDashboardVisualizationLoading$ = store.select(
      getCurrentDashboardVisualizationLoading
    );

    this.currentDashboardVisualizationLoaded$ = store.select(
      getCurrentDashboardVisualizationLoaded
    );
  }

  onToggleVisualizationFullScreen(fullScreenDetails: any) {
    this.store.dispatch(
      new SetCurrentDashboardAction(fullScreenDetails.dashboardId)
    );
  }
  ngOnInit() {}
}
