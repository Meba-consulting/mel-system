import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { formatProgramsForDataEntry } from '../../../helpers';

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
  constructor(
    private store: Store<State>,
    private dataService: DataService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.programs && this.programs.length > 0) {
      this.showPrograms = true;
    }

    this.formattedPrograms = formatProgramsForDataEntry(this.programs);
    console.log('this', this.formattedPrograms);
  }

  onFilterUpdate(selections) {
    console.log(selections);
    this.ouFilterIsSet = false;
    this.ouId = selections?.items[0]?.id;
    this.selectedOrgUnits = selections?.items;
    this.selectedOu = selections?.items[0];
    if (this.ouId && this.programId) {
      this.paramersSet = true;
    }
  }

  onFilterClose(selections) {
    console.log('closing');
    this.ouFilterIsSet = false;
  }

  getForm(val) {
    console.log(val);
    this.currentProgram = null;
    setTimeout(() => {
      this.currentProgram = val;
      this.programId = val?.id;
      if (this.ouId && this.programId) {
        this.paramersSet = true;
      }
    }, 600);
  }

  toggleSubItems() {
    this.showSubMenu = !this.showSubMenu;
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }
}
