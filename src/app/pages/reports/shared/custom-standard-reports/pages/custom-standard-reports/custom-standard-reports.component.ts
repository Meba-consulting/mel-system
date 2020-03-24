import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { loadStdReportConfigsById } from '../../store/actions';
import { Observable, Subject } from 'rxjs';
import { getStandardReportConfigsById } from '../../store/selectors';

@Component({
  selector: 'ngx-custom-standard-reports',
  templateUrl: './custom-standard-reports.component.html',
  styleUrls: ['./custom-standard-reports.component.css']
})
export class CustomStandardReportsComponent implements OnInit {
  @Input() reportId: string;
  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400
  };
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: true,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showUserOrgUnitSection: false,
      showOrgUnitLevelGroupSection: false,
      showOrgUnitGroupSection: false,
      showOrgUnitLevelSection: false,
      reportUse: false,
      additionalQueryFields: [],
      batchSize: 400
    }
  };
  selectedOrgUnitItems: Array<any> = [];
  pageEvent: any;
  // orgUnitFilterConfig: OrgUnitFilterConfig;
  reportConfigs$: Observable<any>;
  filterSelections: Array<any> = [];
  selectionChanged$: Subject<any> = new Subject();
  selectionChanged: boolean = false;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    if (this.reportId) {
      this.store.dispatch(
        loadStdReportConfigsById({ reportId: this.reportId })
      );
    }
    this.selectionChanged = true;
    this.selectionChanged$.next({
      changed: false
    });
    this.reportConfigs$ = this.store.select(getStandardReportConfigsById, {
      id: this.reportId
    });
    this.orgUnitFilterConfig = {
      reportUse: false,
      singleSelection: false
    };
  }

  onFilterUpdate(selections) {
    this.selectionChanged = false;
    setTimeout(() => {
      this.selectionChanged = true;
      this.selectionChanged$.next({
        changed: true
      });
    }, 1000);
    this.filterSelections = selections;
    console.log('selections', selections);
  }
}
