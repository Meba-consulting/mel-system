import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { formatProgramsForDataEntry } from '../../../helpers';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-data-entry-dashboard',
  templateUrl: './data-entry-dashboard.component.html',
  styleUrls: ['./data-entry-dashboard.component.css'],
})
export class DataEntryDashboardComponent implements OnInit {
  @Input() currentUser: any;
  @Input() programs: any[];
  @Input() userGroups: any[];
  formattedPrograms: any = [];
  departments: Array<any>;
  currentDepartment: any;
  filteredProgramsByDepartments: Array<any>;
  showPrograms: boolean = false;
  showSubMenu: boolean = false;

  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
  selectedOrgUnits: Array<any> = [];
  ouFilterIsSet: boolean = false;
  ouId: string;
  programId: string;
  currentProgram: any;
  paramersSet: boolean = false;
  selectedOu: any;

  queryResponseData$: Observable<any>;
  programDataStoreConfigs$: Observable<any>;
  constructor(
    private store: Store<State>,
    private dataService: DataService,
    private dialog: MatDialog,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit() {
    if (this.programs && this.programs.length > 0) {
      this.showPrograms = true;
    }

    this.formattedPrograms = formatProgramsForDataEntry(this.programs);
    console.log('this', this.formattedPrograms);
    this.currentProgram = this.programs[0];
    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.currentProgram?.id
    );
  }

  onFilterUpdate(selections) {
    console.log(selections);
    this.ouFilterIsSet = false;
    this.paramersSet = false;

    this.ouId = selections?.items[0]?.id;
    this.selectedOrgUnits = selections?.items;
    this.selectedOu = selections?.items[0];
    setTimeout(() => {
      if (this.ouId && this.programId) {
        this.paramersSet = true;
      }
    }, 600);
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onFilterClose(selections) {
    console.log('closing');
    this.ouFilterIsSet = false;
  }

  getForm(val) {
    this.currentProgram = null;
    this.paramersSet = false;
    setTimeout(() => {
      this.currentProgram = val;
      this.programDataStoreConfigs$ = this.httpClient.get(
        'dataStore/programs/' + this.currentProgram?.id
      );
      this.programId = val?.id;
      if (this.ouId && this.programId) {
        this.paramersSet = true;
      }
    }, 600);
  }

  toggleSubItems() {
    this.showSubMenu = !this.showSubMenu;
  }
}
