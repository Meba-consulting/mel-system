import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { formatDataDimensionsSelections } from '../../helpers/filter-selections.helper';

@Component({
  selector: 'app-render-report',
  templateUrl: './render-report.component.html',
  styleUrls: ['./render-report.component.css']
})
export class RenderReportComponent implements OnInit, AfterViewInit {
  @Input() reportHtml: any;
  @Input() reportType: string;
  @Input() reportId: string;
  filterSelections: any;
  orgUnit: any;
  period: any;
  htmlCodes: SafeHtml;
  filterSelectionss: any;
  selectionChanged: boolean = false;
  selectionFilterConfig: any = {
    showDataFilter: false,
    showPeriodFilter: true,
    showOrgUnitFilter: true,
    showLayout: false,
    showFilterButton: false,
    orgUnitFilterConfig: {
      singleSelection: true,
      showUserOrgUnitSection: false,
      showOrgUnitLevelGroupSection: false,
      showOrgUnitGroupSection: false,
      showOrgUnitLevelSection: false,
      reportUse: false,
      additionalQueryFields: [],
      batchSize: 400
    }
  };
  selectedOrgUnitItems: Array<any> = [];
  isFilterRequired: boolean = false;
  addedDimensions: any[] = [];
  dimensions: any[] = [];
  currentSetDimenions: any;
  selectedDimensions: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    let configs = this.reportHtml.match(
      /<configs[^>]*>([\w|\W]*)<\/configs>/im
    );
    if (
      configs &&
      configs.length > 0 &&
      configs.join(';').indexOf('no-filter') > -1
    ) {
      this.selectionChanged = true;
      var iframe = document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.minHeight = '100vh';
      iframe.setAttribute('id', 'iframe_id');
      iframe.setAttribute(
        'onload',
        'this.height=this.contentWindow.document.body.scrollHeight;'
      );
      setTimeout(() => {
        var ctnr = document.getElementById('html_id');
        if (ctnr) {
          ctnr.appendChild(iframe);
          iframe.contentWindow.document.open('text/htmlreplace');
          iframe.contentWindow.document.write(this.reportHtml);
          iframe.contentWindow.document.close();
        }
      }, 50);
      this.isFilterRequired = false;
    } else {
      this.isFilterRequired = true;
      this.selectionChanged = true;
      if (
        configs &&
        configs.length > 0 &&
        configs.join(';').indexOf('dimensions') > -1
      ) {
        let dimensions = this.reportHtml.match(/configdimensions='(.*?)'/g);
        this.addedDimensions = JSON.parse(
          dimensions[0]
            .replace("configdimensions='", '')
            .substring(
              0,
              dimensions[0].replace("configdimensions='", '').length - 1
            )
        );
      }
    }
    try {
      this.htmlCodes = this.sanitizer.bypassSecurityTrustHtml(this.reportHtml);
    } catch (error) {
      //console.log(error);
    }
  }

  ngAfterViewInit() {
    try {
      this.setScriptsOnHtmlContent(this.getScriptsContents(this.reportHtml));
    } catch (e) {
      console.log('ng after view int ' + JSON.stringify(e));
    }
  }

  setScriptsOnHtmlContent(scripts) {
    const scriptsContents = `
          try {${scripts.join('')}} catch(e) { console.log(e);}`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = scriptsContents;
    document.getElementById(`data_set_report_id`).appendChild(script);
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

  onDimensionSelectionChanged(e, dimension) {
    this.currentSetDimenions = dimension;
    if (!this.selectedDimensions) {
      this.selectedDimensions = {};
    }
    _.map(this.addedDimensions, group => {
      if (_.filter(group.dimensions, { id: dimension.id }).length > 0) {
        this.selectedDimensions[group.id] = dimension;
      }
    });
  }

  onFilterUpdate(selections) {
    console.log('repo di', this.selectedDimensions);
    if (
      (selections.length > 1 && !this.selectedDimensions) ||
      (selections.length > 1 &&
        this.selectedDimensions &&
        Object.keys(this.selectedDimensions).length > 1)
    ) {
      this.selectionChanged = false;

      setTimeout(() => {
        this.selectionChanged = true;
        setTimeout(() => {
          try {
            var iframe = document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.minHeight = '100vh';
            iframe.setAttribute('id', 'iframe_id');
            iframe.setAttribute(
              'onload',
              'this.height=this.contentWindow.document.body.scrollHeight;'
            );
            var ctnr = document.getElementById('html_id');
            if (ctnr) {
              ctnr.appendChild(iframe);
              iframe.contentWindow.document.open('text/htmlreplace');
              iframe.contentWindow.document.write(this.reportHtml);
              iframe.contentWindow[
                'iReportsDimensions'
              ] = formatDataDimensionsSelections(
                selections,
                this.selectedDimensions
              );
              iframe.contentWindow.document.close();
            }
          } catch (e) {
            console.log(e);
          }
        }, 50);
      }, 100);
      this.filterSelections = selections;
    }
  }
}
