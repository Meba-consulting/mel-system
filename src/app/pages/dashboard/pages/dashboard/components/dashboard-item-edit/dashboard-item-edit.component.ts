import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-item-edit',
  templateUrl: './dashboard-item-edit.component.html',
  styleUrls: ['./dashboard-item-edit.component.css'],
})
export class DashboardItemEditComponent implements OnInit {
  dashboard: any;
  dashboardName: string;
  description: string;
  updateResponse$: Observable<any>;
  saving: boolean = false;
  changed: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<DashboardItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.dashboard = data?.dashboard;
    this.dashboardName = this.dashboard?.name;
    this.description = this.dashboard?.description;
  }

  ngOnInit(): void {}

  onSave(e) {
    this.saving = true;
    this.changed = false;
    const data = {
      description: this.description,
      id: this.dashboard?.id,
      name: this.dashboardName,
      favorites: this.dashboard?.favorite,
      userGroupAccesses: this.dashboard?.userGroupAccesses,
      dashboardItems: this.dashboard?.dashboardItems,
      userAccesses: this.dashboard?.userAccesses,
    };
    e.stopPropagation();
    this.updateResponse$ = this.httpClient
      .put('dashboards/' + this.dashboard?.id + '?mergeMode=UPDATE', data)
      .pipe(
        map((response) => {
          this.saving = false;
          this.changed = true;
          return response;
        }),
        catchError((e) => {
          this.saving = false;
          return of(e);
        })
      );
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close(this.changed);
  }
}
