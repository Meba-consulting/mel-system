import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';

import * as _ from 'lodash';
import { formatDateYYMMDD } from '../../helpers';

@Component({
  selector: 'app-stage-entry-updates-model',
  templateUrl: './stage-entry-updates-model.component.html',
  styleUrls: ['./stage-entry-updates-model.component.css'],
})
export class StageEntryUpdatesModelComponent implements OnInit {
  program: any;
  orgUnit: any;
  currentTrackedEntityInstanceId: string;
  isFormValid: boolean = false;
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
  eventLoaded: boolean = false;
  eventsData: any = {};
  savedUserDataStore$: Observable<any>;
  isListReportSet: boolean = false;
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<StageEntryUpdatesModelComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService
  ) {
    this.program = data?.program;
    this.orgUnit = data?.orgUnit;
    this.currentTrackedEntityInstanceId = data?.currentTrackedEntityInstanceId;
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
      eventDate: formatDateYYMMDD(new Date()),
    };

    this.savedUserDataStore$ = this.dataService.getSavedUserDataStoreProgramConfigurations(
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

  onGetFormValidity(validity) {
    this.isFormValid = validity;
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
  }

  onGetFormValuesData(values, stageDataElements) {
    this.eventsData.dataValues = _.map(
      _.filter(Object.keys(values), (key) => {
        if (values[key]?.value !== '') {
          return key;
        }
      }),
      (element) => {
        return {
          dataElement: element,
          value: !(stageDataElements.filter(
            (stageDataElement) => stageDataElement?.dataElement?.id == element
          ) || [])[0]?.dataElement?.optionSet
            ? values[element]?.value
            : ((stageDataElements.filter(
                (stageDataElement) =>
                  stageDataElement?.dataElement?.id == element
              ) || [])[0]?.dataElement?.optionSet.options.filter(
                (option) => option.id === values[element]?.value
              ) || [])[0]?.name,
        };
      }
    );
  }

  changeTabForData(e, val) {
    e.stopPropagation();
    this.selectedTabForDataSection.setValue(val);
    this.loadStageData = true;
  }

  onDeleteEvent(e) {
    this.dialog
      .open(ConfirmDeleteModalComponent, {
        width: '20%',
        height: '150px',
        disableClose: false,
        data: { message: 'Are you sure?', item: '' },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed == true) {
          this.loadStageData = false;
          this.dataService.deleteEvent(e.event).subscribe((response) => {
            if (response) {
              this.queryResponseData$ = this.dataService.getTrackedEntityInstances(
                {
                  orgUnit: this.orgUnit?.id,
                  program: this.program?.id,
                }
              );
            }
          });
          setTimeout(() => {
            this.loadStageData = true;
          }, 500);
        }
      });
  }

  onEditEvent(e) {
    this.currentEventToEdit = e;
    _.map(e.dataValues, (dataValue) => {
      this.programStageFormData[dataValue?.dataElement] = {
        id: dataValue?.dataElement,
        value: dataValue?.value,
      };
    });
    this.selectedTabForDataSection.setValue(0);
  }

  onSetEditEvent(e) {
    this.isEditSet = e;
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
}
