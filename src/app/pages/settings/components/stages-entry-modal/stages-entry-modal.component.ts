import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
import { ConfirmDeleteEventComponent } from '../confirm-delete-event/confirm-delete-event.component';
import { Store } from '@ngrx/store';
import { getCurrentUser, State } from 'src/app/store';

@Component({
  selector: 'app-stages-entry-modal',
  templateUrl: './stages-entry-modal.component.html',
  styleUrls: ['./stages-entry-modal.component.css'],
})
export class StagesEntryModalComponent implements OnInit {
  program: any;
  currentTrackedEntityInstanceId: string;
  orgUnit: any;
  selectedTab = new FormControl(0);
  selectedTabForDataSection = new FormControl(0);
  savingMessage: string = '';
  loadStageData: boolean = false;
  queryResponseData$: Observable<any>;
  isEditSet: boolean = false;
  currentEventToEdit: any;
  programStageFormData: any = {};
  showStageDataEntry: boolean = true;
  savingProgramData: boolean = false;
  savedUserDataStore$: Observable<any>;
  eventsData: any = {};
  eventLoaded: boolean = false;
  isListReportSet: boolean = false;
  programDataStoreConfigs$: Observable<any>;
  isFormValid: string;
  deleting: boolean = false;
  currentUser$: Observable<any>;
  constructor(
    private store: Store<State>,
    private dialogRef: MatDialogRef<StagesEntryModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService,
    private httpClient: NgxDhis2HttpClientService
  ) {
    this.program = data?.program;
    this.currentTrackedEntityInstanceId = data?.currentTrackedEntityInstanceId;
    this.orgUnit = data?.orgUnit;
    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.program?.id
    );
    this.currentUser$ = this.store.select(getCurrentUser);
  }

  ngOnInit(): void {
    this.getTrackedEntityInstanceData({
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

    this.savedUserDataStore$ =
      this.dataService.getSavedUserDataStoreProgramConfigurations(
        this.program?.id
      );
  }

  getTrackedEntityInstanceData(parameters) {
    this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
      orgUnit: parameters?.orgUnit,
      program: parameters?.program,
    });

    this.eventLoaded = true;
    this.isListReportSet = true;
  }
  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
  }

  changeTabForData(e, val) {
    e.stopPropagation();
    this.selectedTabForDataSection.setValue(val);
    this.loadStageData = true;
  }

  onDeleteEvent(e) {
    console.log(e);
    this.dialog
      .open(ConfirmDeleteEventComponent, {
        width: '30%',
        height: '250px',
        disableClose: false,
        data: e,
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe(() => {
        this.selectedTabForDataSection.setValue(0);
        setTimeout(() => {
          this.selectedTabForDataSection.setValue(1);
        }, 100);
      });
  }

  onSaveData(e, programStage, editSet) {
    e.stopPropagation();
    this.savingMessage = 'Saving data';
    this.savingProgramData = true;
    this.loadStageData = false;
    this.eventsData.programStage = programStage?.id;
    !editSet
      ? this.dataService
          .saveEventsData({ events: [this.eventsData] })
          .subscribe((response) => {
            this.savingMessage = 'Saved data successfully';
            this.savingProgramData = false;
            console.log(response);
            this.loadStageData = true;
            setTimeout(() => {
              this.savingMessage = '';
              this.showStageDataEntry = false;
            }, 1000);
            setTimeout(() => {
              this.showStageDataEntry = true;
            }, 1300);
          })
      : this.dataService
          .updateEventData(this.currentEventToEdit?.event, this.eventsData)
          .subscribe((response) => {
            this.savingMessage = 'Saved data successfully';
            this.savingProgramData = false;
            console.log(response);
            this.loadStageData = true;
            this.programStageFormData = {};
            this.currentEventToEdit = null;
            this.isEditSet = false;
            this.selectedTabForDataSection.setValue(1);
            setTimeout(() => {
              this.savingMessage = '';
              this.showStageDataEntry = false;
            }, 1000);
            setTimeout(() => {
              this.showStageDataEntry = true;
            }, 1300);
          });
  }

  onSetEditEvent(e) {
    console.log(e);
    this.currentEventToEdit = e;
    _.map(e.dataValues, (dataValue) => {
      this.programStageFormData[dataValue?.dataElement] = {
        id: dataValue?.dataElement,
        value: dataValue?.value,
      };
    });
  }

  onGetFormValidity(e) {
    this.isFormValid = e;
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

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }
}
