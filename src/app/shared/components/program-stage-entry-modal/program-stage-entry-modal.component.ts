import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-program-stage-entry-modal',
  templateUrl: './program-stage-entry-modal.component.html',
  styleUrls: ['./program-stage-entry-modal.component.css'],
})
export class ProgramStageEntryModalComponent implements OnInit {
  programStage: any;
  program: any;
  programDataStoreConfigs$: Observable<any>;
  queryResponseData$: Observable<any>;
  currentTrackedEntityInstanceId: string;
  programStageFormData: any = {};
  orgUnit: any;
  constructor(
    private dialogRef: MatDialogRef<ProgramStageEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService,
    private dataService: DataService
  ) {
    this.programStage = data?.programStage;
    this.program = data?.program;
    this.currentTrackedEntityInstanceId = data?.currentTrackedEntityInstanceId;
    this.orgUnit = data?.orgUnit;
    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.program?.id
    );
  }

  ngOnInit(): void {
    this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
      orgUnit: this.orgUnit?.id,
      program: this.program?.id,
    });
  }

  onGetFormValuesData(values, programStageDataElements) {
    console.log(values);
  }

  onGetFormValidity(formValidity) {
    console.log(formValidity);
  }

  onSetEditEvent(editEvent) {
    console.log(editEvent);
  }

  onDeleteEvent(e) {
    console.log(e);
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
