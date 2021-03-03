import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { report } from 'process';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-report',
  templateUrl: './upload-report.component.html',
  styleUrls: ['./upload-report.component.css'],
})
export class UploadReportComponent implements OnInit {
  reportGroup: any;
  htmlText: any = '';
  systemIds$: Observable<any>;
  dataObject: any;
  reportSaveResponse$: Observable<any>;
  isEditSet: boolean = false;
  report: any;

  reportName: string = '';
  constructor(
    private dialogRef: MatDialogRef<UploadReportComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.reportGroup = data?.reportGroup;
    this.isEditSet = data?.report ? true : false;
    this.report = data?.report;
    this.reportName = data?.report ? data?.report?.name : '';
  }

  ngOnInit(): void {
    this.systemIds$ = this.httpClient.get('system/id.json?limit=1');
  }

  fileSelection(event, uid) {
    var reader = new FileReader();
    const element: HTMLElement = document.getElementById('fileSelector');
    const fileName = event.target.files[0].name;
    const file = event.target.files[0];
    let self = this;
    reader.onload = function (e) {
      const text = reader.result;
      self.htmlText = text;
      self.dataObject = {
        cacheStrategy: 'RESPECT_SYSTEM_SETTING',
        designContent: text,
        name: self.reportName,
        relativePeriods: {},
        reportParams: {},
        reportTable: {
          id: !self.isEditSet ? uid : self.report?.id,
        },
        type: 'HTML',
      };

      if (self.isEditSet) {
        self.dataObject['id'] = self.report?.id;
      }
    };

    reader.readAsBinaryString(file);
  }

  saveData(e, data) {
    e.stopPropagation();
    if (!this.isEditSet) {
      this.reportSaveResponse$ = this.httpClient.post('reports', data);
    } else {
      this.reportSaveResponse$ = this.httpClient.put(
        'reports/' + this.report?.id,
        data
      );
    }
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
