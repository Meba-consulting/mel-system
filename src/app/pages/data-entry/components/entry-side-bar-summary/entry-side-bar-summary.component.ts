import { Component, Input, OnInit } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';
import { from, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-entry-side-bar-summary',
  templateUrl: './entry-side-bar-summary.component.html',
  styleUrls: ['./entry-side-bar-summary.component.css'],
})
export class EntrySideBarSummaryComponent implements OnInit {
  @Input() program: any;
  @Input() configs: any;
  indicators: any[];
  dataResponse$: Observable<any>;
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit(): void {
    this.indicators =
      _.map(this.configs?.indicators || [], (indicator) => {
        return indicator;
      }) || [];

    console.log('indicators', this.indicators);
    this.dataResponse$ =
      this.indicators?.length > 0
        ? zip(
            ...this.indicators.map((indicator: any) => {
              return from(
                this.httpClient
                  .get(
                    'analytics?dimension=dx:' +
                      indicator?.id +
                      '&dimension=pe:THIS_YEAR&filter=ou:zs9X8YYBOnK&displayProperty=NAME&skipMeta=true&includeNumDen=true'
                  )
                  .pipe(
                    map((response) => {
                      return {
                        name: indicator?.name,
                        id: indicator?.id,
                        pe:
                          response && response?.rows[0]
                            ? response?.rows[0][1]
                            : null,
                        value:
                          response && response?.rows[0]
                            ? response?.rows[0][2]
                            : null,
                      };
                    })
                  )
              );
            })
          )
        : from([this.indicators]);
  }
}
