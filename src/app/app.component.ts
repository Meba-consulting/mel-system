import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { State, LoadSystemInfo } from './store';
import { Title } from '@angular/platform-browser';
import { ManifestService, Manifest } from '@iapps/ngx-dhis2-http-client';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    private manifestService: ManifestService
  ) {}

  ngOnInit() {
    // Load system information
    this.store.dispatch(new LoadSystemInfo());

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // set title after loading it from manifest file
    this.manifestService
      .getManifest()
      .pipe(catchError(() => of(null)))
      .subscribe((manifest: Manifest) => {
        if (manifest) {
          this.titleService.setTitle(manifest.name);
        } else {
          this.titleService.setTitle('Interactive Dashboard');
        }
      });
  }
}
