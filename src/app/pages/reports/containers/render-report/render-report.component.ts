import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {
  processAnalyticsData,
  extractAnalyticsElements
} from '../../helpers/reports.helpers';
import * as _ from 'lodash';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-render-report',
  templateUrl: './render-report.component.html',
  styleUrls: ['./render-report.component.css']
})
export class RenderReportComponent implements OnInit, AfterViewInit {
  @Input() report: any;
  @Input() reportDimensions: any;
  @Input() selectedOus: any;
  @Input() customReportDesign: any;
  analyticsElements: Array<any>;
  _htmlMarkup: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    console.log('customReportDesign', this.customReportDesign);
    try {
      this._htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(
        this.customReportDesign
      );
    } catch (e) {
      console.log('ng on init ' + JSON.stringify(e));
    }
  }

  ngAfterViewInit() {
    try {
      this.setScriptsOnHtmlContent(
        this.getScriptsContents(this.customReportDesign)
      );
    } catch (error) {
      console.log('ng after view int ' + JSON.stringify(error));
    }
  }

  setScriptsOnHtmlContent(scripts) {
    // Embed inline javascripts
    const scriptsContents = `
          try {${scripts.join('')}} catch(e) { console.log(e);}`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = scriptsContents;
    document.getElementById(`_custom_report`).appendChild(script);
  }

  getScriptsContents(html) {
    this.analyticsElements = extractAnalyticsElements();
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
