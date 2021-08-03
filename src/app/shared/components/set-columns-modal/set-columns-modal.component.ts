import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

import * as _ from 'lodash';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-set-columns-modal',
  templateUrl: './set-columns-modal.component.html',
  styleUrls: ['./set-columns-modal.component.css'],
})
export class SetColumnsModalComponent implements OnInit {
  columns: any;
  columnsSet: any = {};
  programId: string = '';
  saving: boolean = false;
  savingMessage: string = '';
  savedColumns: any;
  savedData: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<SetColumnsModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.columns = data?.columnsInfo?.allColumns;
    // console.log(this.columns);
    this.savedColumns = data?.columnsInfo?.savedColumns;

    this.programId = data?.programId;
    _.map(this.columns, (column) => {
      this.columnsSet[column?.name] = !this.savedColumns?.message
        ? _.keyBy(this.savedColumns, 'id')[column?.name]?.show
        : true;
    });
  }

  ngOnInit(): void {}

  onSave(e, savedColumns) {
    e.stopPropagation();
    // this.dialogRef.close(true);
    this.saving = true;
    this.savingMessage = 'Saving changes';
    const data = _.map(this.columns, (column) => {
      return {
        id: column?.name,
        show: this.columnsSet[column?.name],
        valueType: null,
        displayName: column?.column,
      };
    });
    savedColumns?.message
      ? this.httpClient
          .post(
            'userDataStore/trackerCaptureGridColumns/' + this.programId,
            data
          )
          .pipe(
            map((response) => {
              return response;
            }),
            catchError((e) => {
              return of(e);
            })
          )
          .subscribe((userDataStoreResponse) => {
            this.saving = false;
            this.savedData = true;
            this.savingMessage = 'Saved changes successfully';
            setTimeout(() => {
              this.savingMessage = '';
            }, 1000);
          })
      : this.httpClient
          .put(
            'userDataStore/trackerCaptureGridColumns/' + this.programId,
            data
          )
          .pipe(
            map((response) => {
              return response;
            }),
            catchError((e) => {
              return of(e);
            })
          )
          .subscribe((userDataStoreResponse) => {
            this.savedData = true;
            this.saving = false;
            this.savingMessage = 'Saved changes successfully';
            setTimeout(() => {
              this.savingMessage = '';
            }, 1000);
          });
  }

  setColumn(e, column) {
    if (e.checked) {
      this.columnsSet[column?.name] = true;
    } else {
      this.columnsSet[column?.name] = false;
    }
  }

  onCancel(e) {
    e.stopPropagation();
    this.dialogRef.close(this.savedData);
  }
}
