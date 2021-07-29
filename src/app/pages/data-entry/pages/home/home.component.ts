import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  State,
  getCurrentUser,
  getAllPrograms,
  getAllUserGroups,
} from 'src/app/store';
import { loadDataEntryFlow } from '../../store/actions';
import { getFormsLoadedState } from '../../store/selectors';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<any>;
  programs$: Observable<any[]>;
  programsLoadedState$: Observable<any>;
  userGroups$: Observable<any>;
  dataSets$: Observable<any>;
  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.programs$ = this.store.select(getAllPrograms);
    this.programsLoadedState$ = this.store.select(getFormsLoadedState);
    this.userGroups$ = this.store.select(getAllUserGroups);
    this.store.dispatch(loadDataEntryFlow());
    this.dataSets$ = this.httpClient
      .get(
        'dataSets.json?paging=false&fields=id,name,code,formType,organisationUnits,dataEntryForm[id,name,*],userGroupAccesses[id,name]'
      )
      .pipe(
        map((response) => {
          return response?.dataSets;
        })
      );
  }

  ngOnInit() {}
}
