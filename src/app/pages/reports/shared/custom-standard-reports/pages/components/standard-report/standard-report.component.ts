import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  getIndicatorConfigsFromHtml,
  assignDataValuesToInputs
} from '../../../helpers';

import * as _ from 'lodash';
import { createSelectionDimensions } from '../../../helpers/format-dimensions.helpers';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { loadAnalyticsData } from '../../../store/actions';
import { Observable } from 'rxjs';
import {
  getAnalyticsDataById,
  getCountOfLoadedIndicators
} from '../../../store/selectors';

@Component({
  selector: 'app-standard-report',
  templateUrl: './standard-report.component.html',
  styleUrls: ['./standard-report.component.css']
})
export class StandardReportComponent implements OnInit, AfterViewInit {
  @Input() customHtml: any;
  @Input() reportId: string;
  @Input() reportName: string;
  @Input() filterSelections: any;
  indicators: any;
  dimensions: Array<any> = [];
  _htmlMarkup: SafeHtml;
  loadedData$: Observable<any>;
  percentProgress: number = 50;
  countOfLoadedIndicators$: Observable<any>;
  constructor(private sanitizer: DomSanitizer, private store: Store<State>) {}

  ngOnInit(): void {
    try {
      this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
        this.customHtml
      );
    } catch (e) {
      console.log('ng on init ' + JSON.stringify(e));
    }
  }

  ngAfterViewInit() {
    try {
      this.setScriptsOnHtmlContent(this.getScriptsContents(this.customHtml));
    } catch (error) {
      console.log('ng after view int ' + JSON.stringify(error));
    }
  }

  setScriptsOnHtmlContent(scripts) {
    const scriptsContents = `
          try {${scripts.join('')}} catch(e) { console.log(e);}`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = scriptsContents;
    document.getElementById(`_custom_report_`).appendChild(script);
    this.indicators = getIndicatorConfigsFromHtml();
    this.dimensions = createSelectionDimensions(
      this.filterSelections,
      this.indicators
    );
    console.log('dimensions', this.dimensions);
    this.store.dispatch(loadAnalyticsData({ dimensions: this.dimensions }));
    _.map(this.dimensions, dimension => {
      this.loadedData$ = this.store.select(getAnalyticsDataById, {
        id: dimension.dx + '-' + dimension.ou.join('-') + '-' + dimension.pe
      });
      assignDataValuesToInputs(this.loadedData$, dimension.dx);
    });
    this.countOfLoadedIndicators$ = this.store.select(
      getCountOfLoadedIndicators
    );
  }

  getScriptsContents(html) {
    const matchedScriptArray = html.match(
      /<script[^>]*>([\w|\W]*)<\/script>/im
    );

    const scripts =
      matchedScriptArray && matchedScriptArray.length > 0
        ? matchedScriptArray[0]
            .replace(/(<([^>]+)>)/gi, ':separator:')
            .split(':separator:')
            .filter(content => content.length > 0)
        : [];

    return _.filter(scripts, (scriptContent: string) => scriptContent !== '');
  }
}
