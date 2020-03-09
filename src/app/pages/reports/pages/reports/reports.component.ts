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

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: true,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showOrgUnitLevelGroupSection: false,
      showUserOrgUnitSection: false
    }
  };
  reportsList$: Observable<any>;
  selectedReportId: string;
  reportConfigs$: Observable<any>;
  reportDimensions: any = [];
  reportEntities$: Observable<any>;
  indicatorLoadedState$: Observable<Boolean>;
  selectedOus: any;
  filtersSelected: any;
  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.store.dispatch(loadReportsList());
  }

  ngOnInit() {
    this.reportsList$ = this.store.select(getReportsList);
    this.selectedReportId = this.route.snapshot.params['id'];
    this.store.dispatch(
      loadReportsConfigurationsById({ reportId: this.selectedReportId })
    );
    this.reportConfigs$ = this.store.select(getReportConfigsById, {
      id: this.selectedReportId
    });
  }

  getReportConfigs(id) {
    this.selectedReportId = id;
    this.store.dispatch(loadReportsConfigurationsById({ reportId: id }));
    this.reportConfigs$ = this.store.select(getReportConfigsById, {
      id: id
    });
    // this.reportConfigs$.subscribe(reportConfigs => {
    //   if (reportConfigs && this.filtersSelected.length > 1) {
    //     this.reportDimensions = [];
    //     this.store.dispatch(resetIndicatorDataLoadedState());
    //     this.selectedOus = _.filter(this.filtersSelected, {
    //       dimension: 'ou'
    //     })[0].items;
    //     _.map(
    //       _.filter(this.filtersSelected, { dimension: 'ou' })[0].items,
    //       ouInfo => {
    //         this.reportDimensions.push({
    //           ou: ouInfo.id,
    //           pe: getItems(
    //             _.filter(this.filtersSelected, { dimension: 'pe' })[0].items
    //           ),
    //           dx: getIndicatorIds(reportConfigs['configs']['indicators']),
    //           reportId: this.selectedReportId
    //         });
    //       }
    //     );
    //     this.store.dispatch(
    //       loadIndicatorsData({ dimensions: this.reportDimensions })
    //     );
    //     this.reportEntities$ = this.store.select(getIndicatorAnalyticsEntities);
    //     this.indicatorLoadedState$ = this.store.select(
    //       getIndicatorAnalyticsLoadedState
    //     );
    //   }
    // });
  }

  onFilterUpdate(filters) {
    this.filtersSelected = filters;
    this.reportConfigs$.subscribe(reportConfigs => {
      // if (reportConfigs && filters.length > 1) {
      //   this.reportDimensions = [];
      //   this.store.dispatch(resetIndicatorDataLoadedState());
      //   this.selectedOus = _.filter(filters, { dimension: 'ou' })[0].items;
      //   _.map(_.filter(filters, { dimension: 'ou' })[0].items, ouInfo => {
      //     this.reportDimensions.push({
      //       ou: ouInfo.id,
      //       pe: getItems(_.filter(filters, { dimension: 'pe' })[0].items),
      //       dx: getIndicatorIds(reportConfigs['configs']['indicators']),
      //       reportId: this.selectedReportId
      //     });
      //   });
      //   this.store.dispatch(
      //     loadIndicatorsData({ dimensions: this.reportDimensions })
      //   );
      //   this.reportEntities$ = this.store.select(getIndicatorAnalyticsEntities);
      //   this.indicatorLoadedState$ = this.store.select(
      //     getIndicatorAnalyticsLoadedState
      //   );
      // }
    });
  }
}
