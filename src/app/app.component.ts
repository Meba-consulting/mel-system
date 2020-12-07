import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Manifest,
  NgxDhis2HttpClientService
} from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fn } from '@iapps/function-analytics';

import {
  LoadSystemInfo,
  State,
  getCurrentUser,
  getAllSystemUsers,
  LoadSystemUsers,
  loadUserGroups,
  loadPrograms
} from './store';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser$: Observable<any>;
  users$: Observable<any>;

  isViewAllContentsSet: boolean = false;
  searchInput: string;
  isChatSet: boolean = false;
  selectedUsername: string = '';
  currentUserUsername: string;
  currentDashboardId: string;
  viewMaintenance: boolean = false;
  constructor(
    private store: Store<State>,
    private translate: TranslateService,
    private titleService: Title,
    private httpClient: NgxDhis2HttpClientService,
    private route: ActivatedRoute
  ) {
    this.searchInput = '';
  }

  ngOnInit() {
    // initialize function analytics
    if (Fn) {
      Fn.init({
        baseUrl: '../../../api/'
      });
    }
    // Load system information
    this.store.dispatch(new LoadSystemInfo());
    this.store.dispatch(new LoadSystemUsers());
    this.store.dispatch(loadUserGroups());
    this.store.dispatch(loadPrograms());

    this.currentUser$ = this.store.select(getCurrentUser);
    this.currentUser$.subscribe(currentUserInfo => {
      if (currentUserInfo) {
        let currentDashboard = localStorage.getItem(
          'dhis2.dashboard.current.' + currentUserInfo.userCredentials.username
        );
        this.currentDashboardId = currentDashboard;
        _.each(currentUserInfo.userGroups, userGroup => {
          if (userGroup.name.indexOf('_MAINTENANCE') > -1) {
            this.viewMaintenance = true;
          }
        });
      }
    });

    this.users$ = this.store.select(getAllSystemUsers);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // set title after loading it from manifest file
    this.httpClient
      .manifest()
      .pipe(catchError(() => of(null)))
      .subscribe((manifest: Manifest) => {
        if (manifest) {
          this.titleService.setTitle(manifest.name);
        } else {
          this.titleService.setTitle('Loading .......');
        }
      });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  sliceContents(arr, start, end, viewAll) {
    if (!viewAll) {
      return _.slice(arr, start, end);
    } else {
      return arr;
    }
  }

  setViewAll() {
    this.isViewAllContentsSet = !this.isViewAllContentsSet;
  }

  showChat() {
    this.isChatSet = !this.isChatSet;
  }
}
