import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { formatDateToYYMMDD } from 'src/app/pages/data-entry/helpers';

import * as _ from 'lodash';
import { ConfirmDeleteEventComponent } from 'src/app/pages/settings/components/confirm-delete-event/confirm-delete-event.component';
import { FormControl } from '@angular/forms';

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
  eventsData: any;
  currentEventToEdit: any;
  selectedTab = new FormControl(0);
  savingMessage: string = '';
  savingProgramData: boolean = false;
  isEditSet: boolean = false;
  isFormValid: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<ProgramStageEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService,
    private dataService: DataService,
    private dialog: MatDialog
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

    this.eventsData = {
      trackedEntityInstance: this.currentTrackedEntityInstanceId,
      program: this.program?.id,
      programStage: '',
      enrollment: this.currentTrackedEntityInstanceId,
      orgUnit: this.orgUnit?.id,
      notes: [],
      dataValues: [],
      status: 'ACTIVE',
      eventDate: formatDateToYYMMDD(new Date()),
    };
  }

  onGetFormValuesData(data, programStageDataElements) {
    let keyedDataElements = {};
    _.map(programStageDataElements, (programStageDataElement) => {
      keyedDataElements[programStageDataElement?.dataElement?.id] =
        programStageDataElement?.dataElement;
    });
    let dataValues = [];
    dataValues = _.filter(
      _.map(Object.keys(data), (key) => {
        if (data[key] || data[key] !== '')
          return {
            dataElement: key,
            value: !keyedDataElements[key]?.optionSet
              ? data[key]?.value
              : (_.filter(keyedDataElements[key]?.optionSet?.options, {
                  id: data[key]?.value,
                }) || [])[0]?.name,
          };
      }),
      (dataValue) => dataValue
    );
    this.eventsData.dataValues = dataValues;
    this.eventsData.eventDate = !this.eventsData?.eventDate
      ? formatDateToYYMMDD(new Date())
      : this.eventsData?.eventDate;
  }

  onSaveData(e, programStage, editSet) {
    e.stopPropagation();
    this.savingMessage = 'Saving data';
    this.savingProgramData = true;
    this.eventsData.programStage = programStage?.id;
    console.log(this.eventsData);
    console.log('programStage', programStage);
    console.log('currentEventToEdit', this.currentEventToEdit);
    !this.isEditSet
      ? this.dataService
          .saveEventsData({ events: [this.eventsData] })
          .subscribe((response) => {
            this.savingMessage = 'Saved data successfully';
            this.savingProgramData = false;
            console.log(response);
            setTimeout(() => {
              this.savingMessage = '';
            }, 1000);
          })
      : this.dataService
          .updateEventData(this.currentEventToEdit?.event, this.eventsData)
          .subscribe((response) => {
            this.savingMessage = 'Saved data successfully';
            this.savingProgramData = false;
            console.log(response);
            this.programStageFormData = {};
            this.currentEventToEdit = null;
            this.isEditSet = false;
            this.selectedTab.setValue(0);
            setTimeout(() => {
              this.savingMessage = '';
            }, 1000);
          });
  }

  onGetFormValidity(formValidity) {
    console.log(formValidity);
    this.isFormValid = formValidity;
  }

  onEdit(e) {
    console.log('edit', e);
    this.currentEventToEdit = e;
    _.map(e.dataValues, (dataValue) => {
      this.programStageFormData[dataValue?.dataElement] = {
        id: dataValue?.dataElement,
        value: dataValue?.value,
      };
    });
    this.isEditSet = true;
    this.selectedTab.setValue(1);
  }

  onDeleteEvent(e) {
    console.log(e);
    console.log(e);
    this.dialog.open(ConfirmDeleteEventComponent, {
      width: '30%',
      height: '250px',
      disableClose: false,
      data: e,
      panelClass: 'custom-dialog-container',
    });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
