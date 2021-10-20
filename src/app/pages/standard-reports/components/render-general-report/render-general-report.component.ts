import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralReportsService } from 'src/app/core/services/general-reports.service';

@Component({
  selector: 'app-render-general-report',
  templateUrl: './render-general-report.component.html',
  styleUrls: ['./render-general-report.component.css'],
})
export class RenderGeneralReportComponent implements OnInit {
  @Input() reportId: string;
  @Input() type: string;
  @Input() program: any;
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
      batchSize: 400,
    },
    periodFilterConfig: {
      singleSelection: false,
    },
  };
  selectedOrgUnitItems: Array<any> = [];
  programConfigs$: Observable<any>;
  dataSelections: any;
  shouldRenderReport: boolean = false;
  constructor(private generalReportService: GeneralReportsService) {}

  ngOnInit(): void {
    this.programConfigs$ =
      this.generalReportService.getGeneralReportDataStoreConfigs(this.program);
  }

  onFilterUpdate(selections) {
    this.dataSelections = {};
    selections.map((selection) => {
      this.shouldRenderReport = false;
      this.dataSelections[selection?.dimension] = selection?.items[0];
    });
    setTimeout(() => {
      if (Object.keys(this.dataSelections).length > 1) {
        this.shouldRenderReport = true;
      }
    }, 500);
  }

  printPDF() {
    setTimeout(function () {
      window.print();
    }, 500);
  }

  downloadAsListToExcel(event: Event, id, program): void {
    const fileName = program?.name + ' list report';
    event.stopPropagation();

    const htmlTable = document.getElementById(id).outerHTML;
    if (htmlTable) {
      const uri = 'data:application/vnd.ms-excel;base64,',
        template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:' +
          'office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
          '<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
          '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
          '</head><body><table border="1">{table}</table><br /><table border="1">{table}</table></body></html>',
        base64 = (s) => window.btoa(unescape(encodeURIComponent(s))),
        format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

      const ctx = { worksheet: 'List', filename: fileName };
      let str =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office' +
        ':excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
        '<x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
        '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>';
      ctx['div'] = htmlTable;

      str += '{div}</body></html>';
      const link = document.createElement('a');
      link.download = fileName + '.xls';
      link.href = uri + base64(format(str, ctx));
      link.click();
    }
  }
}
