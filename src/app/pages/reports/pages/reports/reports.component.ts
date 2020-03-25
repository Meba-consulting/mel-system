import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  loadReportsList,
  loadReportsConfigurationsById
} from '../../store/actions/reports-list.actions';
import {
  getReportsList,
  getReportConfigsById
} from '../../store/selectors/reports-list.selectors';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { getItems, getIndicatorIds } from '../../helpers/reports.helpers';
import {
  loadIndicatorsData,
  resetIndicatorDataLoadedState
} from '../../store/actions/indicators-data.actions';
import {
  getIndicatorAnalyticsEntities,
  getIndicatorAnalyticsLoadedState
} from '../../store/selectors/indicators-data.selectors';
import { getCurrentUser } from 'src/app/store';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportsList$: Observable<any>;
  selectedReportId: string;
  reportConfigs$: Observable<any>;
  reportDimensions: any = [];
  reportEntities$: Observable<any>;
  indicatorLoadedState$: Observable<Boolean>;
  selectedOus: any;
  filtersSelected: any;
  currentUser$: Observable<any>;
  currentUserSelectedGroup: any;
  selectedReport: any;
  isReportSet: boolean = false;
  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.currentUser$.subscribe(currentUser => {
      if (currentUser && currentUser['userGroups']) {
        this.currentUserSelectedGroup = currentUser['userGroups'][0];
        this.store.dispatch(
          loadReportsConfigurationsById({
            reportId: currentUser['userGroups'][0]['id']
          })
        );
      }
    });
  }

  ngOnInit() {
    this.reportConfigs$ = this.store.select(getReportConfigsById, {
      id: this.currentUserSelectedGroup.id
    });
    this.reportConfigs$.subscribe(reportsList => {
      if (
        reportsList &&
        reportsList['configs'] &&
        reportsList['configs'].length > 0
      ) {
        this.selectedReport = reportsList['configs'][0];
        this.isReportSet = true;
      }
    });
  }

  getReport(report) {
    this.isReportSet = false;
    this.selectedReport = report;
    setTimeout(() => {
      this.isReportSet = true;
    }, 1000);
  }

  onSelectReportGroup(reportGroup) {
    this.store.dispatch(
      loadReportsConfigurationsById({
        reportId: reportGroup.id
      })
    );

    this.reportConfigs$ = this.store.select(getReportConfigsById, {
      id: reportGroup.id
    });

    this.reportConfigs$.subscribe(reportsList => {
      if (
        reportsList &&
        reportsList['configs'] &&
        reportsList['configs'].length > 0
      ) {
        this.selectedReport = reportsList['configs'][0];
      }
    });
  }
}
