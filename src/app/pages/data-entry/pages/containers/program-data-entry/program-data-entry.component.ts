import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getProgramById } from 'src/app/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  loadDataEntryFlow,
  loadProgramDataEntryFlowConfigs
} from '../../../store/actions';
import { getCurrentProgramDataEntryFlowConfigs } from '../../../store/selectors/data-entry-flow.selectors';

import * as _ from 'lodash';

@Component({
  selector: 'app-program-data-entry',
  templateUrl: './program-data-entry.component.html',
  styleUrls: ['./program-data-entry.component.css']
})
export class ProgramDataEntryComponent implements OnInit {
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: false,
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
      batchSize: 400,
      selectedOrgUnitItems: []
    }
  };
  selectedOrgUnitItems: Array<any> = [];
  category: string;
  type: string;
  id: string;
  currentProgram$: Observable<any>;
  currentProgramDataEntryFlowConfigs$: Observable<any>;
  selectionChanged: boolean = false;
  selectedOrgUnit: any;
  constructor(private store: Store<State>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'].toLowerCase();
    this.type = this.route.snapshot.params['type'].toLowerCase();
    this.id = this.route.snapshot.params['id'];
    this.currentProgram$ = this.store.select(getProgramById, { id: this.id });
    this.store.dispatch(loadDataEntryFlow());
    this.store.dispatch(loadProgramDataEntryFlowConfigs({ id: this.id }));
    this.currentProgramDataEntryFlowConfigs$ = this.store.select(
      getCurrentProgramDataEntryFlowConfigs,
      { id: this.id }
    );
  }

  onFilterUpdate(selections) {
    this.selectionChanged = false;
    setTimeout(() => {
      this.selectedOrgUnit = _.filter(selections, { dimension: 'ou' })[0][
        'items'
      ][0];
      this.selectionChanged = true;
    }, 20);
  }
}
