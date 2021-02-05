import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getAllGroupDashboards,
  getCurrentDashboardId,
  getAllDashboardGroups,
  getActiveDashboardGroup,
  getDashboardObjectLoading,
  getDashboardObjectLoaded,
  getDashboardGroupsLoading,
  getDashboardGroupsLoaded,
} from '../../../store/selectors';
import { Dashboard, DashboardGroups } from '../../models';
import { LoadFunctions } from '../../modules/ngx-dhis2-data-selection-filter/modules/data-filter/store/actions/function.actions';

import { State } from 'src/app/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  InitializeDashboardSettingsAction,
  SetCurrentDashboardAction,
  SetActiveDashboardGroupsAction,
  CreateDashboardAction,
  ToggleDashboardBookmarkAction,
} from '../../../store/actions';
import { loadOrgUnitLevels } from 'src/app/shared/modules/org-unit-filter/store/actions/org-unit-level.actions';
import { loadOrgUnitGroups } from 'src/app/shared/modules/org-unit-filter/store/actions/org-unit-group.actions';
import { MatDialog } from '@angular/material/dialog';
import { DashboardItemEditComponent } from '../../components/dashboard-item-edit/dashboard-item-edit.component';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  dashboards$: Observable<Dashboard[]>;
  currentDashboardId$: Observable<string>;
  currentDashboardGroupId$: Observable<string>;
  menuContainerHeight: number;
  dashboardLoading$: Observable<boolean>;
  dashboardLoaded$: Observable<boolean>;
  dashboardGroups$: Observable<DashboardGroups[]>;
  dashboardGroupsLoading$: Observable<boolean>;
  dashboardGroupsLoaded$: Observable<boolean>;
  dashboardContentMarginTop = '5px';

  @HostListener('window:beforeprint', ['$event'])
  onBeforePrint(event) {
    event.stopPropagation();
    document.getElementById('dashboard_content').style.marginTop = '20px';
  }

  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event) {
    event.stopPropagation();
    document.getElementById(
      'dashboard_content'
    ).style.marginTop = this.dashboardContentMarginTop;
  }

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit() {
    // initialize dashboads settings
    this.store.dispatch(new InitializeDashboardSettingsAction());
    this.store.dispatch(new LoadFunctions());
    this.store.dispatch(loadOrgUnitLevels());
    this.store.dispatch(loadOrgUnitGroups());
    this.store.select(getCurrentDashboardId).subscribe((id) => {
      if (id) {
        this.router.navigate(['/dashboards', id]);
      }
    });

    this.dashboards$ = this.store.select(getAllGroupDashboards);
    this.currentDashboardId$ = this.store.select(getCurrentDashboardId);
    this.dashboardLoading$ = this.store.select(getDashboardObjectLoading);
    this.dashboardLoaded$ = this.store.select(getDashboardObjectLoaded);
    this.dashboardGroups$ = this.store.select(getAllDashboardGroups);
    this.currentDashboardGroupId$ = this.store.select(getActiveDashboardGroup);
    this.dashboardGroupsLoading$ = this.store.select(getDashboardGroupsLoading);
    this.dashboardGroupsLoaded$ = this.store.select(getDashboardGroupsLoaded);

    // Set margin top based on whether there are groups or not
    this.dashboardGroups$.subscribe((dashboardGroups: any[]) => {
      // if (dashboardGroups.length === 0) {
      //   this.dashboardContentMarginTop = '110px';
      // } else {
      //   this.dashboardContentMarginTop = '157px';
      // }
    });
  }

  onSetCurrenDashboardAction(dashboardId: string) {
    this.store.dispatch(new SetCurrentDashboardAction(dashboardId));
  }

  onSetActiveDashboardGroupAction(group: DashboardGroups) {
    this.store.dispatch(new SetActiveDashboardGroupsAction(group));
  }

  onCreateDashboardAction(dashboardName: string) {
    this.store.dispatch(new CreateDashboardAction(dashboardName));
  }

  onToggleDashboardBookmark(dashboardDetails: {
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

  onEditDashboard(dashboard) {
    this.httpClient.get('dashboards/' + dashboard?.id + '.json?fields=id,name,description,favorites[id],dashboardItems[id,type,chart[id,name,description,type]],userGroupAccesses,userAccesses').subscribe(response => {
      if (response) {
        this.dialog.open(DashboardItemEditComponent, {
          width: '50%',
          height: '370px',
          disableClose: true,
          data: { dashboard: response },
          panelClass: 'custom-dialog-container',
        }).afterClosed().subscribe(res => {
          if (res) {
            window.location.reload()
          }
        })
      }
    })
    
  }
}
