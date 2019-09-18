import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Manifest,
  NgxDhis2HttpClientService
} from '@iapps/ngx-dhis2-http-client';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fn } from '@iapps/function-analytics';

import { LoadSystemInfo, State } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<State>,
    private translate: TranslateService,
    private titleService: Title,
    private httpClient: NgxDhis2HttpClientService
  ) {}

  ngOnInit() {
    // initialize function analytics
    if (Fn) {
      Fn.init({
        baseUrl: '../../../api/'
      });

      console.log(Fn);
    }
    // Load system information
    this.store.dispatch(new LoadSystemInfo());

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
          this.titleService.setTitle('Loading Dashboard...');
        }
      });
  }
}
