import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';

import * as _ from 'lodash';
import {
  getUserGroupsToSeeDataEntryTabs,
  getDepartmentsFromUserGroups
} from '../../../helpers';
import { loadProgramMetadata } from '../../../store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-entry-dashboard',
  templateUrl: './data-entry-dashboard.component.html',
  styleUrls: ['./data-entry-dashboard.component.css']
})
export class DataEntryDashboardComponent implements OnInit {
  @Input() currentUser: any;
  @Input() programs: any[];
  departments: Array<any>;
  currentDepartment: Array<any>;
  constructor(private store: Store<State>) {
    // this.store.dispatch(
    //   loadProgramMetadata({ programId: 'IzEQE6HnpoC,UWyXM8q8WGd,NaTg5H77zCU' })
    // );
  }

  ngOnInit() {
    this.departments = getDepartmentsFromUserGroups(this.currentUser);
    this.currentDepartment = this.departments[0];
    // this.userGroupsControl = getUserGroupsToSeeDataEntryTabs(this.currentUser);
  }

  onSetCurrentDepartment(department) {
    this.currentDepartment = department;
  }
}
