import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';

import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import {
  formatDateToYYMMDD,
  formatProgramsForDataEntry,
} from '../../../helpers';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { UploadAggregateDataModalComponent } from '../../../components/upload-aggregate-data-modal/upload-aggregate-data-modal.component';
import { DataEntryService } from '../../../services/data-entry.service';

@Component({
  selector: 'app-data-entry-dashboard',
  templateUrl: './data-entry-dashboard.component.html',
  styleUrls: ['./data-entry-dashboard.component.css'],
})
export class DataEntryDashboardComponent implements OnInit {
  @Input() currentUser: any;
  @Input() programs: any[];
  @Input() userGroups: any[];
  @Input() dataSets: any[];
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
    updateOnSelect: true,
    additionalQueryFields: [],
    batchSize: 400,
    selectedOrgUnitItems: [],
  };
  selectedOrgUnits: Array<any> = [];
  ouFilterIsSet: boolean = false;
  ouId: string;
  programId: string;
  currentProgram: any;
  isFormSelected: boolean = false;
  paramersSet: boolean = false;
  selectedOu: any;

  queryResponseData$: Observable<any>;
  programDataStoreConfigs$: Observable<any>;
  systemIds$: Observable<any>;
  showAggregateDataSection: boolean = false;
  selectedAggregatePeriod: any;
  aggregateDataReponse$: Observable<any>;
  aggregateDataObject: any = {};
  saveAggregateDataResponse$: Observable<any>;
  saving: boolean = false;
  constructor(
    private store: Store<State>,
    private dataEntryService: DataEntryService,
    private dialog: MatDialog,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit() {
    if (this.programs && this.programs.length > 0) {
      this.showPrograms = true;
    }

    this.systemIds$ = this.httpClient.get('system/id.json?limit=2');

    this.formattedPrograms = formatProgramsForDataEntry(
      this.programs,
      this.dataSets
    );
    // console.log('this', this.formattedPrograms);
    this.currentProgram = this.programs[0];
    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.currentProgram?.id
    );
  }

  onFilterUpdate(selections) {
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
    this.selectedOrgUnits = [];
  }

  onGetSelectedProgram(itemSelection) {
    const form = itemSelection?.items[0];
    this.selectedOrgUnits = [];
    this.isFormSelected = false;
    this.currentProgram = null;
    this.paramersSet = false;
    this.selectedOu = null;
    setTimeout(() => {
      this.currentProgram = form;
      this.isFormSelected = true;
      this.programDataStoreConfigs$ = this.httpClient.get(
        'dataStore/programs/' + this.currentProgram?.id
      );
      this.programId = form?.id;
      if (this.ouId && this.programId) {
        this.paramersSet = true;
      }
    }, 600);
  }

  toggleSubItems() {
    this.showSubMenu = !this.showSubMenu;
  }

  onChangeAggregatePeriod(period) {
    this.selectedAggregatePeriod = period;
    this.saveAggregateDataResponse$ = of(null);
    this.showAggregateDataSection = false;
    setTimeout(() => {
      this.aggregateDataReponse$ = this.dataEntryService.getDataSetValues(
        this.currentProgram?.id,
        period?.id,
        this.selectedOu?.id
      );
      this.showAggregateDataSection = true;
    }, 200);
  }

  saveAggregateData(event, data) {
    event.stopPropagation();
    this.saving = true;
    this.saveAggregateDataResponse$ =
      this.dataEntryService.saveAggregateData(data);
    this.saveAggregateDataResponse$.subscribe((response) => {
      if (response) {
        setTimeout(() => {
          this.saving = false;
        }, 200);
      }
    });
  }

  onDataValueEntry(dataValues, period, selectedOu) {
    this.aggregateDataObject = {
      dataSet: this.currentProgram?.id,
      completeDate: formatDateToYYMMDD(new Date()),
      period: period?.id,
      orgUnit: selectedOu?.id,
      dataValues: Object.keys(dataValues).map((key) => {
        return {
          dataElement: dataValues[key]?.dataElement
            ? dataValues[key]?.dataElement
            : dataValues[key]?.domElementId.split('-')[0],
          categoryOptionCombo: dataValues[key]?.categoryOptionCombo
            ? dataValues[key]?.categoryOptionCombo
            : dataValues[key]?.domElementId.split('-')[1],
          value: dataValues[key]?.value,
        };
      }),
    };
  }

  onOpenUploadModal(event) {
    this.dialog.open(UploadAggregateDataModalComponent, {
      width: '40%',
    });
  }
}
