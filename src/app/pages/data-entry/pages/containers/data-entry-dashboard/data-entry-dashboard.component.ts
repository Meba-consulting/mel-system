import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';

import * as _ from 'lodash';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { DataEntryService } from '../../../services/data-entry.service';
import {
  formatAttributesValues,
  filterWithContainingCharactes,
  getUserGroupsToSeeDataEntryTabs
} from '../../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { loadProgramMetadata } from '../../../store/actions';

@Component({
  selector: 'app-data-entry-dashboard',
  templateUrl: './data-entry-dashboard.component.html',
  styleUrls: ['./data-entry-dashboard.component.css']
})
export class DataEntryDashboardComponent implements OnInit {
  @Input() currentUser: any;
  userGroupsControl: any;
  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService,
    private dataEntryService: DataEntryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.store.dispatch(
      loadProgramMetadata({ programId: 'IzEQE6HnpoC,UWyXM8q8WGd,NaTg5H77zCU' })
    );
  }

  ngOnInit() {
    this.userGroupsControl = getUserGroupsToSeeDataEntryTabs(this.currentUser);
  }
}
