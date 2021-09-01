import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { loadStdReportsList } from '../../store/actions';
import {
  getOldReportsList,
  getCountOfLoadedReportTypes,
} from '../../store/selectors';
import {
  getAllUserGroups,
  getCurrentUser,
  getProgramsForGeneralReports,
} from 'src/app/store';
import { FormControl } from '@angular/forms';

import { keyBy } from 'lodash';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  reportsList$: Observable<any>;
  countOfLoadedReportTypes$: Observable<number>;
  reportTypes: any[] = [
    {
      type: 'reports',
      url: 'reports.json?paging=false&fields=*',
    },
  ];
  currentUser$: Observable<any>;
  currentReportGroup: any;
  isReportGroupSet: boolean = false;

  selectedTab = new FormControl(0);

  userGroups$: Observable<any>;

  reportsAreas: any[];
  dataSets$: Observable<any[]>;
  programs$: Observable<any[]>;
  constructor(
    private store: Store<State>,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit(): void {
    this.dataSets$ = this.httpClient
      .get('dataSets.json?fields=id,name,description,code&paging=false')
      .pipe(
        map((response) => {
          return response?.dataSets;
        })
      );
    this.programs$ = this.store.select(getProgramsForGeneralReports);
    this.currentUser$ = this.store.select(getCurrentUser);
    this.userGroups$ = this.store.select(getAllUserGroups);
    this.store.dispatch(loadStdReportsList({ reportsTypes: this.reportTypes }));
    this.reportsList$ = this.store.select(getOldReportsList);
    this.countOfLoadedReportTypes$ = this.store.select(
      getCountOfLoadedReportTypes
    );

    this.currentUser$.subscribe((userDetails) => {
      if (userDetails) {
        this.reportsAreas = [
          {
            id: 'general_reports',
            name: 'GENERAL REPORTS',
          },
        ];
        const keyedUserGroups = keyBy(userDetails?.userGroups, 'id');
        if (keyedUserGroups['Dnf8GlsGZ4M']) {
          this.reportsAreas.push({
            id: 'standard_reports',
            name: 'STANDARD REPORTS',
          });
        }
        if (keyedUserGroups['lNfnAZRchBc']) {
          this.reportsAreas.push({
            id: 'uploaded_reports',
            name: 'UPLOADED REPORTS',
          });
        }
        if (keyedUserGroups['dzB1kyCukQf']) {
          this.reportsAreas.push({
            id: 'activity_tracker',
            name: 'ACTIVITY TRACKER',
          });
        }
      }
    });
  }

  onSelectReportGroup(reportGroup) {
    this.isReportGroupSet = false;
    this.currentReportGroup = reportGroup;
    setTimeout(() => {
      this.isReportGroupSet = true;
    }, 50);
  }

  changeTab(val) {
    this.selectedTab.setValue(val);
  }
}
