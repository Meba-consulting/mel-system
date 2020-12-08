import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';

import * as _ from 'lodash';
import {
  getUserGroupsToSeeDataEntryTabs,
  getDepartmentsFromUserGroups,
  filterProgramsByDepartments,
} from '../../../helpers';
import { loadProgramMetadata } from '../../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-entry-dashboard',
  templateUrl: './data-entry-dashboard.component.html',
  styleUrls: ['./data-entry-dashboard.component.css'],
})
export class DataEntryDashboardComponent implements OnInit {
  @Input() currentUser: any;
  @Input() programs: any[];
  @Input() userGroups: any[];
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
  constructor(private store: Store<State>) {
    // this.store.dispatch(
    //   loadProgramMetadata({ programId: 'IzEQE6HnpoC,UWyXM8q8WGd,NaTg5H77zCU' })
    // );
  }

  ngOnInit() {
    if (this.programs && this.programs.length > 0) {
      // this.departments = getDepartmentsFromUserGroups(this.currentUser);
      // this.currentDepartment = this.departments[0];
      // this.filteredProgramsByDepartments = filterProgramsByDepartments(
      //   this.programs,
      //   this.currentDepartment
      // );
      this.showPrograms = true;
    }
    // this.userGroupsControl = getUserGroupsToSeeDataEntryTabs(this.currentUser);
  }

  onFilterUpdate(selections) {
    console.log(selections);
  }

  onFilterClose(selections) {
    console.log('closing');
  }

  getForm(val) {
    console.log(val);
  }

  toggleSubItems() {
    this.showSubMenu = !this.showSubMenu;
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onSetCurrentDepartment(department) {
    this.currentDepartment = department;
    this.showPrograms = false;
    setTimeout(() => {
      this.filteredProgramsByDepartments = filterProgramsByDepartments(
        this.programs,
        this.currentDepartment
      );
      this.showPrograms = true;
    }, 20);
  }
}
