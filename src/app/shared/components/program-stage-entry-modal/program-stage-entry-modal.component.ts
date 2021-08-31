import { Component, Inject, Input, OnInit } from '@angular/core';
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
import { FormControl } from '@angular/forms';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { ExportToExcelJsonService } from 'src/app/core/services/export-to-excel-json.service';
import { UploadExcelDataModalComponent } from '../upload-excel-data-modal/upload-excel-data-modal.component';

@Component({
  selector: 'app-program-stage-entry-modal',
  templateUrl: './program-stage-entry-modal.component.html',
  styleUrls: ['./program-stage-entry-modal.component.css'],
})
export class ProgramStageEntryModalComponent implements OnInit {
  @Input() currentProgramStage: any;
  @Input() currentProgram: any;
  @Input() trackedEntityInstanceId: string;
  @Input() selectedOrgUnit: any;
  @Input() currentUser: any;
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
  countOfEvents: number = 0;
  index: number = 0;

  eventDeletingMessage = '';
  @Input() configs: any;
  orgUnitData$: Observable<any>;
  constructor(
    private dialogRef: MatDialogRef<ProgramStageEntryModalComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService,
    private dataService: DataService,
    private dialog: MatDialog,
    private excelService: ExportToExcelJsonService
  ) {
    this.programStage = data?.programStage;
    this.program = data?.program;
    this.currentTrackedEntityInstanceId = data?.currentTrackedEntityInstanceId;
    this.orgUnit = data?.orgUnit;
    this.currentUser = this.currentUser ? this.currentUser : data?.currentUser;
    this.configs = !this.configs ? data?.configs : this.configs;
  }

  ngOnInit(): void {
    this.programStage = this.programStage
      ? this.programStage
      : this.currentProgramStage;
    this.program = this.program ? this.program : this.currentProgram;

    this.currentTrackedEntityInstanceId = this.currentTrackedEntityInstanceId
      ? this.currentTrackedEntityInstanceId
      : this.trackedEntityInstanceId;

    this.orgUnit = this.orgUnit ? this.orgUnit : this.selectedOrgUnit;
    this.programDataStoreConfigs$ = this.httpClient.get(
      'dataStore/programs/' + this.program?.id
    );
    this.orgUnitData$ = this.httpClient.get(
      `organisationUnits/${this.orgUnit?.id}.json?fields=id,name,code,level,children[id,name,code,level]`
    );
    if (this.orgUnit && this.program) {
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
        status: 'COMPLETED',
        eventDate: formatDateToYYMMDD(new Date()),
      };
    }
  }

  getCountOfEvents(eventsCount) {
    this.countOfEvents = eventsCount;
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
    const elementsOfTypeResource =
      programStage?.programStageDataElements.filter(
        (programStageDataElement) =>
          programStageDataElement?.dataElement?.valueType === 'FILE_RESOURCE'
      ) || [];
    const elemId =
      elementsOfTypeResource.length > 0
        ? elementsOfTypeResource[0]?.dataElement?.id
        : null;
    const isElementOfTypeFileResourceHasValue = elemId
      ? (
          this.eventsData.dataValues.filter(
            (dataValue) => dataValue?.dataElement === elemId
          ) || []
        )?.length > 0
      : false;

    if (
      elementsOfTypeResource.length === 0 &&
      !isElementOfTypeFileResourceHasValue
    ) {
      !this.isEditSet
        ? this.dataService
            .saveEventsData({ events: [this.eventsData] })
            .subscribe((response) => {
              this.savingMessage = 'Saved data successfully';
              this.savingProgramData = false;
              this.index = 0;
              this.queryResponseData$ =
                this.dataService.getTrackedEntityInstances({
                  orgUnit: this.orgUnit?.id,
                  program: this.program?.id,
                });
              setTimeout(() => {
                this.savingMessage = '';
              }, 1000);
            })
        : this.dataService
            .updateEventData(this.currentEventToEdit?.event, this.eventsData)
            .subscribe((response) => {
              this.savingMessage = 'Saved data successfully';
              this.savingProgramData = false;
              this.programStageFormData = {};
              this.currentEventToEdit = null;
              this.isEditSet = false;
              this.selectedTab.setValue(0);
              this.index = 0;
              this.queryResponseData$ =
                this.dataService.getTrackedEntityInstances({
                  orgUnit: this.orgUnit?.id,
                  program: this.program?.id,
                });
              setTimeout(() => {
                this.savingMessage = '';
              }, 1000);
            });
    } else {
      const fileResourceValue = (this.eventsData.dataValues.filter(
        (dataValue) => dataValue?.dataElement === elemId
      ) || [])[0]?.value;
      this.dataService
        .uploadDataValueResource(fileResourceValue)
        .subscribe((response) => {
          if (response) {
            const newEventData = {
              ...this.eventsData,
              dataValues: [
                ...(this.eventsData.dataValues.filter(
                  (dataValue) => dataValue?.dataElement !== elemId
                ) || []),
                {
                  dataElement: elemId,
                  value: response.response.fileResource.id,
                },
              ],
            };
            !this.isEditSet
              ? this.dataService
                  .saveEventsData({ events: [newEventData] })
                  .subscribe((response) => {
                    this.savingMessage = 'Saved data successfully';
                    this.savingProgramData = false;
                    this.index = 0;
                    this.queryResponseData$ =
                      this.dataService.getTrackedEntityInstances({
                        orgUnit: this.orgUnit?.id,
                        program: this.program?.id,
                      });
                    setTimeout(() => {
                      this.savingMessage = '';
                    }, 1000);
                  })
              : this.dataService
                  .updateEventData(
                    this.currentEventToEdit?.event,
                    this.eventsData
                  )
                  .subscribe((response) => {
                    this.savingMessage = 'Saved data successfully';
                    this.savingProgramData = false;
                    this.programStageFormData = {};
                    this.currentEventToEdit = null;
                    this.isEditSet = false;
                    this.selectedTab.setValue(0);
                    this.index = 0;
                    this.queryResponseData$ =
                      this.dataService.getTrackedEntityInstances({
                        orgUnit: this.orgUnit?.id,
                        program: this.program?.id,
                      });
                    setTimeout(() => {
                      this.savingMessage = '';
                    }, 1000);
                  });
          }
        });
    }
  }

  onGetFormValidity(formValidity) {
    this.isFormValid = formValidity;
  }

  onEdit(e) {
    this.currentEventToEdit = e;
    _.map(e.dataValues, (dataValue) => {
      this.programStageFormData[dataValue?.dataElement] = {
        id: dataValue?.dataElement,
        value: dataValue?.value,
      };
    });
    this.index = 1;
    this.isEditSet = true;
    this.selectedTab.setValue(1);
  }

  onDeleteEvent(e) {
    this.dialog
      .open(ConfirmDeleteModalComponent, {
        width: '20%',
        height: '150px',
        disableClose: false,
        data: {
          message: 'Are you sure you want to delete this record?',
          item: null,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed == true) {
          this.eventDeletingMessage = 'Deleting selected item';
          this.dataService.deleteEvent(e.event).subscribe((deleteResponse) => {
            if (deleteResponse) {
              this.eventDeletingMessage = 'Successfully deleted the item';
              setTimeout(() => {
                this.eventDeletingMessage = '';
                this.queryResponseData$ =
                  this.dataService.getTrackedEntityInstances({
                    orgUnit: this.orgUnit?.id,
                    program: this.program?.id,
                  });
              }, 500);
            }
          });
        }
      });
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }

  onGetExcelTemplate(e, stage, configs, orgUnitData): void {
    e.stopPropagation();
    let dataElementsAsColumns = {};
    stage.programStageDataElements.forEach((programStageDataElement) => {
      dataElementsAsColumns[programStageDataElement?.dataElement?.name] = '';
    });
    let otherDetails = {
      orgunit: this.orgUnit?.id,
      form_reference: this.program.id + '_' + stage?.id,
      form_name: this.program.name,
      reference_id: this.currentTrackedEntityInstanceId,
    };
    this.excelService.generateExcel(
      [{ ...otherDetails, ...dataElementsAsColumns }],
      [
        'orgunit',
        'form_reference',
        'form_name',
        'reference_id',
        ...stage.programStageDataElements.map((programStageDataElement) => {
          return programStageDataElement.dataElement?.name;
        }),
      ],
      stage.programStageDataElements
        .map((programStageDataElement, index) => {
          return {
            id: programStageDataElement.dataElement?.id,
            name: programStageDataElement.dataElement?.name,
            index: index + 4,
            options:
              programStageDataElement.dataElement?.optionSet &&
              programStageDataElement.dataElement?.optionSet?.options &&
              programStageDataElement.dataElement?.optionSet?.options?.length >
                0
                ? programStageDataElement.dataElement?.optionSet?.options.map(
                    (option) => option?.code
                  )
                : [],
          };
        })
        .filter((formattedElem) => formattedElem?.options?.length > 0) || [],
      stage?.name,
      stage.programStageDataElements,
      orgUnitData
    );
  }

  onOpenFileUploadForEvents(e) {
    e.stopPropagation();
    this.dialog
      .open(UploadExcelDataModalComponent, {
        width: '500px',
        height: '170px',
        disableClose: false,
        data: {
          trackedEntityInstanceId: this.currentTrackedEntityInstanceId,
          orgUnit: this.orgUnit,
          programStage: this.programStage,
          program: this.program,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((response) => {
        if (response === true) {
          this.selectedTab.setValue(0);
          this.index = 0;
          this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
            orgUnit: this.orgUnit?.id,
            program: this.program?.id,
          });
        }
      });
  }
}
