import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getDataElementsFromProgram,
  formatDateToYYMMDD,
  formatProgrgamIndicators,
} from '../../helpers';

import * as _ from 'lodash';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { DataEntryService } from '../../services/data-entry.service';
import { ConfirmDeleteModalComponent } from 'src/app/shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';
import { SetColumnsModalComponent } from 'src/app/shared/components/set-columns-modal/set-columns-modal.component';
import { FormControl } from '@angular/forms';
import { StageEntryUpdatesModelComponent } from '../stage-entry-updates-model/stage-entry-updates-model.component';
import { DeletingItemComponent } from 'src/app/shared/components/deleting-item/deleting-item.component';

@Component({
  selector: 'app-program-entry',
  templateUrl: './program-entry.component.html',
  styleUrls: ['./program-entry.component.css'],
})
export class ProgramEntryComponent implements OnInit {
  @Input() program: any;
  @Input() dataEntryFlow: any;
  @Input() orgUnit: any;
  @Input() currentUser: any;
  @Input() indicators: any;
  @Input() stagesEntryOnly: any;
  @Input() configs: any;
  @Input() systemIds: string[];
  attributeValues: any;
  events$: Observable<any>;
  elementsDataValues: any = {};
  dataElements: any[];
  minDate: Date;
  maxDate: Date;
  reportingDate: any;
  dataValues: any[] = [];
  eventSaveMessage: string = '';
  isListReportSet: boolean = true;
  eventLoaded: boolean = false;
  events: any[];
  dateChanged: boolean = false;
  elementsToDisable: string[] = [];

  queryResponseData$: Observable<any>;
  savedUserDataStore$: Observable<any>;

  isFormValid: boolean = false;
  isFormForEntitiesValid: boolean = false;
  currentTrackedEntityInstanceId: string;

  eventsData: any = {};

  loadStageData: boolean = false;
  savingProgramData: boolean = false;
  showStageDataEntry: boolean = true;

  savingMessage: string = '';

  selectedTab = new FormControl(0);
  selectedTabForDataSection = new FormControl(0);
  currentTabValue = 0;

  programStageFormData: any = {};

  isEditSet: boolean = false;
  currentEventToEdit: any;

  eventWithoutRegistrationData: any;

  responseSavingEventsData$: Observable<any>;
  eventDataValues: any = {};

  eventToEdit: any;

  savingEventWithoutRegistration: boolean = false;

  shouldOpenStagesForEntry: boolean = false;
  editingData: boolean = false;
  savingEnrollmentData: boolean = false;

  formData: any = {};

  countOfFieldsFilled: number = 0;

  elementValuesArray: any[] = [];

  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private dataEntryService: DataEntryService,
    private dialog: MatDialog,
    private dataService: DataService
  ) {
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth, currentDate);
  }

  ngOnInit(): void {
    if (this.program?.programType == 'WITH_REGISTRATION') {
      this.getTrackedEntityInstanceData({
        orgUnit: this.orgUnit?.id,
        program: this.program?.id,
      });
    } else {
      this.queryResponseData$ = this.httpClient.get(
        'events.json?paging=false&program=' +
          this.program?.id +
          '&orgUnit=' +
          this.orgUnit?.id
      );
    }

    this.eventsData = {
      trackedEntityInstance: '',
      program: this.program?.id,
      programStage: '',
      enrollment: '',
      orgUnit: this.orgUnit?.id,
      notes: [],
      dataValues: [],
      status: 'ACTIVE',
      eventDate: null,
    };

    this.savedUserDataStore$ = this.dataService.getSavedUserDataStoreProgramConfigurations(
      this.program?.id
    );
  }

  changeTab(e, val) {
    e.stopPropagation();
    this.selectedTab.setValue(val);
  }

  changeTabForData(e, val) {
    e.stopPropagation();
    this.selectedTabForDataSection.setValue(val);
  }

  getTrackedEntityInstanceData(parameters) {
    this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
      orgUnit: parameters?.orgUnit,
      program: parameters?.program,
    });

    this.eventLoaded = true;
    this.isListReportSet = true;
  }

  toggleEntryAndReport(type) {
    this.isEditSet = false;
    this.editingData = false;
    if (type == 'entry') {
      this.isListReportSet = false;
    } else {
      if (this.program?.programType == 'WITH_REGISTRATION') {
        this.getTrackedEntityInstanceData({
          orgUnit: this.orgUnit?.id,
          program: this.program?.id,
        });
      } else {
        this.queryResponseData$ = this.httpClient.get(
          'events.json?paging=false&program=' +
            this.program?.id +
            '&orgUnit=' +
            this.orgUnit?.id
        );
      }
      setTimeout(() => {
        this.isListReportSet = true;
      }, 500);
    }
  }

  getDate(date) {
    this.reportingDate = formatDateToYYMMDD(date);
    this.dataValues = [];
    this.loadStageData = false;
    this.dateChanged = false;
    setTimeout(() => {
      this.dateChanged = true;
      this.loadStageData = true;
    }, 500);
    this.eventsData.eventDate = this.reportingDate;
  }

  getEvents() {
    const dimensions = {
      ou: this.orgUnit.id,
      program: this.program.id,
      programStage: this.program.programStages[0].id,
    };
    this.events$ = this.dataEntryService.getEventsData(dimensions);
  }

  onEntryInfoChange(data) {
    const elemId = data.id.split('-')[0];
    const index = _.findIndex(this.dataValues, { dataElement: elemId });
    _.filter(this.dataValues, { dataElement: elemId }) &&
    _.filter(this.dataValues, { dataElement: elemId }).length > 0
      ? (this.dataValues[index] = {
          dataElement: elemId,
          value: data.value,
        })
      : this.dataValues.push({
          dataElement: elemId,
          value: data.value,
        });
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

  onSaveData(e, programStage, editSet?) {
    e.stopPropagation();
    this.savingMessage = 'Saving data';
    this.savingProgramData = true;
    this.loadStageData = false;
    this.eventsData.eventDate = this.reportingDate;
    this.eventsData.trackedEntityInstance = this.currentTrackedEntityInstanceId;
    this.eventsData.programStage = this.program?.id;
    this.eventsData.programStage = programStage?.id;
    !editSet
      ? this.dataService
          .saveEventsData({ events: [this.eventsData] })
          .subscribe((response) => {
            this.savingMessage = 'Saved data successfully';
            this.savingProgramData = false;
            // console.log(response);
            this.loadStageData = true;
            setTimeout(() => {
              this.savingMessage = '';
              this.isListReportSet = true;
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
            // console.log(response);
            this.loadStageData = true;
            this.programStageFormData = {};
            this.currentEventToEdit = null;
            this.isEditSet = false;
            this.selectedTabForDataSection.setValue(1);
            setTimeout(() => {
              this.savingMessage = '';
              this.isListReportSet = true;
              this.showStageDataEntry = false;
            }, 1000);
            setTimeout(() => {
              this.showStageDataEntry = true;
            }, 1300);
          });
  }

  saveData() {
    this.eventSaveMessage = 'Saving data................';
    this.eventLoaded = false;
    this.httpClient.post('events', this.eventsData).subscribe((response) => {
      setTimeout(() => {
        this.eventSaveMessage = 'Saved successful';
      }, 800);
      setTimeout(() => {
        const dimensions = {
          ou: this.orgUnit.id,
          program: this.program.id,
          programStage: this.program.programStages[0].id,
        };
        this.events$ = this.dataEntryService.getEventsData(dimensions);
        this.events$.subscribe((response) => {
          if (response) {
            setTimeout(() => {
              this.events = response['events'];
            }, 700);
            setTimeout(() => {
              this.eventLoaded = true;
            }, 2000);
          }
        });
      }, 1000);
      setTimeout(() => {
        this.eventSaveMessage = '';
        this.isListReportSet = true;
      }, 1500);
    });
  }

  onSetEdit(trackedEntityInstance) {
    // e.stopPropagation();
    console.log(trackedEntityInstance);
    this.currentTrackedEntityInstanceId = trackedEntityInstance?.action?.id;
    this.reportingDate = new Date(trackedEntityInstance.created);
    this.stagesEntryOnly = false;
    this.dateChanged = true;
    this.isListReportSet = false;
    this.formData = _.keyBy(
      _.map(Object.keys(trackedEntityInstance.action), (key) => {
        return {
          id: key,
          key: key,
          value: trackedEntityInstance.action[key],
        };
      }),
      'key'
    );

    this.editingData = true;
  }

  onSetDelete(e) {
    this.dialog
      .open(ConfirmDeleteModalComponent, {
        width: '30%',
        height: '250px',
        disableClose: false,
        data: { message: 'Are you sure?', item: '' },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed == true) {
          this.dataService
            .deleteTrackedEntityInstance(e.action?.id)
            .subscribe((response) => {
              if (response) {
                if (this.program?.programType == 'WITH_REGISTRATION') {
                  this.getTrackedEntityInstanceData({
                    orgUnit: this.orgUnit?.id,
                    program: this.program?.id,
                  });
                } else {
                  this.queryResponseData$ = this.httpClient.get(
                    'events.json?paging=false&program=' +
                      this.program?.id +
                      '&orgUnit=' +
                      this.orgUnit?.id
                  );
                }
              }
            });
        }
      });
  }

  onSelectTrackedEntityInstance(trackedEntityInstance) {
    // console.log('trackedEntityInstance', trackedEntityInstance);
    this.loadStageData = false;
    this.currentTrackedEntityInstanceId = null;
    this.eventsData.trackedEntityInstance = trackedEntityInstance?.id;
    this.eventsData.enrollment = trackedEntityInstance?.id;
    // setTimeout(() => {
    //   this.currentTrackedEntityInstanceId = trackedEntityInstance[0]?.id;
    //   this.loadStageData = true;
    // }, 500);

    this.dialog.open(StageEntryUpdatesModelComponent, {
      width: '70%',
      height: '650px',
      disableClose: false,
      data: {
        program: this.program,
        orgUnit: this.orgUnit,
        currentTrackedEntityInstanceId: trackedEntityInstance?.id,
      },
      panelClass: 'custom-dialog-container',
    });
  }

  onGetDataValues(values) {
    this.attributeValues = _.map(Object.keys(values), (key) => {
      if (values[key]?.options?.length > 0) {
        return {
          attribute: key,
          value: (_.filter(values[key]?.options, { key: values[key]?.value }) ||
            [])[0]?.label,
        };
      } else {
        return {
          attribute: key,
          value: values[key]?.value,
        };
      }
    });

    _.map(
      this.program.trackedEntityType.trackedEntityTypeAttributes,
      (attr) => {
        if (attr.trackedEntityAttribute?.id === 'C1i3bPWYBRG') {
          this.attributeValues = this.orgUnit?.id
            ? [
                ...this.attributeValues,
                {
                  attribute: 'C1i3bPWYBRG',
                  value: this.orgUnit?.id,
                },
              ]
            : this.attributeValues;
        }
      }
    );
  }

  onSaveTrackedEntityFirst(e) {
    e.stopPropagation();
    this.savingEnrollmentData = true;
    this.currentTrackedEntityInstanceId = this.currentTrackedEntityInstanceId
      ? this.currentTrackedEntityInstanceId
      : this.systemIds[0];

    let data = {
      orgUnit: this.orgUnit?.id,
      trackedEntityInstance: this.currentTrackedEntityInstanceId,
      trackedEntityType: this.program.trackedEntityType.id,
      programOwners: [
        {
          ownerOrgUnit: this.orgUnit?.id,
          program: this.program?.id,
          trackedEntityInstance: this.currentTrackedEntityInstanceId,
        },
      ],
      enrollments: !this.editingData
        ? [
            {
              orgUnit: this.orgUnit?.id,
              program: this.program?.id,
              trackedEntityInstance: this.currentTrackedEntityInstanceId,
              enrollment: this.systemIds[1],
              trackedEntityType: this.program?.trackedEntityType?.id,
              orgUnitName: this.orgUnit?.name,
              events: [],
            },
          ]
        : null,
      relationships: [],
      attributes: this.attributeValues,
    };

    data = this.cleanObject(data);

    this.dataService
      .saveTrackedEntityInstanceAndAssociatedData(
        data,
        this.editingData,
        this.currentTrackedEntityInstanceId,
        this.program
      )
      .subscribe((response) => {
        if (response && response?.status !== 500) {
          this.savingMessage = '';
          this.savingEnrollmentData = false;
          this.shouldOpenStagesForEntry = true;
          this.dialog.open(StageEntryUpdatesModelComponent, {
            width: '70%',
            height: '650px',
            disableClose: false,
            data: {
              program: this.program,
              orgUnit: this.orgUnit,
              currentTrackedEntityInstanceId: this
                .currentTrackedEntityInstanceId,
            },
            panelClass: 'custom-dialog-container',
          });
        }
      });
  }

  cleanObject(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }

  onGetFormValidity(validity) {
    this.isFormValid = validity;
  }

  onGetFormValidityForEntities(validity) {
    this.isFormForEntitiesValid = validity;
  }

  onOpenDialogForSettingClomnsData(columnsInfo) {
    this.dialog
      .open(SetColumnsModalComponent, {
        width: '40%',
        height: '650px',
        disableClose: false,
        data: { columnsInfo: columnsInfo, programId: this.program?.id },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((savedData) => {
        if (savedData) {
          if (this.program?.programType == 'WITH_REGISTRATION') {
            this.getTrackedEntityInstanceData({
              orgUnit: this.orgUnit?.id,
              program: this.program?.id,
            });
          } else {
            this.queryResponseData$ = this.httpClient.get(
              'events.json?paging=false&program=' +
                this.program?.id +
                '&orgUnit=' +
                this.orgUnit?.id
            );
          }

          this.savedUserDataStore$ = this.dataService.getSavedUserDataStoreProgramConfigurations(
            this.program?.id
          );
        }
      });
  }

  onDeleteEvent(e) {
    this.dialog
      .open(ConfirmDeleteModalComponent, {
        width: '30%',
        height: '250px',
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
              if (this.program?.programType == 'WITH_REGISTRATION') {
                this.getTrackedEntityInstanceData({
                  orgUnit: this.orgUnit?.id,
                  program: this.program?.id,
                });
              } else {
                this.queryResponseData$ = this.httpClient.get(
                  'events.json?paging=false&program=' +
                    this.program?.id +
                    '&orgUnit=' +
                    this.orgUnit?.id
                );
              }
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

  onDataValuesChanges(values) {
    this.eventWithoutRegistrationData = {
      program: this.program?.id,
      orgUnit: this.orgUnit?.id,
      dataValues: Object.keys(values)
        .filter((elemId) => values[elemId]?.value !== '')
        .map((key) => {
          return {
            dataElement: key,
            value: values[key]?.value,
          };
        }),
      eventDate: formatDateToYYMMDD(new Date(this.reportingDate)),
    };
  }

  onCustomFormDataValueChange(elementsData) {
    this.elementValuesArray = elementsData;
    this.elementsDataValues = elementsData;
    this.countOfFieldsFilled = Object.keys(this.elementsDataValues)?.length;
    this.eventWithoutRegistrationData = {
      program: this.program?.id,
      orgUnit: this.orgUnit?.id,
      dataValues: Object.keys(this.elementsDataValues)
        .filter((elemId) => this.elementsDataValues[elemId]?.value !== '')
        .map((key) => {
          // console.log('key', key);
          return {
            dataElement: key.split('-')[0],
            value: this.elementsDataValues[key]?.value,
          };
        })
        .filter((dataValue) => dataValue?.value),
      eventDate: formatDateToYYMMDD(this.reportingDate),
    };
  }

  onSaveEventData(e) {
    e.stopPropagation();
    this.savingEventWithoutRegistration = true;
    if (!this.eventToEdit || !this.eventToEdit['event']) {
      this.responseSavingEventsData$ = this.httpClient.post(
        'events.json',
        this.eventWithoutRegistrationData
      );
      this.responseSavingEventsData$.subscribe((res) => {
        if (res) {
          this.savingEventWithoutRegistration = false;
          this.queryResponseData$ = this.httpClient.get(
            'events.json?paging=false&program=' +
              this.program?.id +
              '&orgUnit=' +
              this.orgUnit?.id
          );
          setTimeout(() => {
            this.isListReportSet = true;
          }, 800);
        }
      });
    } else {
      this.responseSavingEventsData$ = this.httpClient.put(
        'events/' + this.eventToEdit['event'] + '.json',
        this.eventWithoutRegistrationData
      );
      this.responseSavingEventsData$.subscribe((res) => {
        if (res) {
          this.savingEventWithoutRegistration = false;
          this.queryResponseData$ = this.httpClient.get(
            'events.json?paging=false&program=' +
              this.program?.id +
              '&orgUnit=' +
              this.orgUnit?.id
          );
          setTimeout(() => {
            this.isListReportSet = true;
          }, 800);
        }
      });
    }
  }

  // onDataValuesChanges(dataValues) {
  //   console.log(dataValues);
  // }

  onCheckFormValidity(isValid) {
    this.isFormValid = isValid;
    if (isValid) {
      this.countOfFieldsFilled = 2;
    }
  }

  onEditEventData(event) {
    this.elementsDataValues = {};
    this.elementValuesArray = [];
    this.reportingDate = new Date(event.eventDate);
    this.eventToEdit = event;
    this.eventDataValues = {};
    Object.keys(event).map((key: any) => {
      this.eventDataValues[key] = {
        id: key,
        value: event[key]?.value,
      };
    });
    Object.keys(this.eventDataValues).map((key) => {
      if (this.eventDataValues[key]?.value) {
        this.elementValuesArray = [
          ...this.elementValuesArray,
          {
            ...this.eventDataValues[key],
            id: key + '-dataElement',
          },
        ];
        this.elementsDataValues[key + '-dataElement'] = this.eventDataValues[
          key
        ];
      }
    });
    this.isListReportSet = false;
  }

  onDeleteEventData(event) {
    this.dialog
      .open(DeletingItemComponent, {
        width: '20%',
        height: '200px',
        disableClose: false,
        data: { path: 'events/' + event?.event, itemName: '' },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.queryResponseData$ = this.httpClient.get(
            'events.json?paging=false&program=' +
              this.program?.id +
              '&orgUnit=' +
              this.orgUnit?.id
          );
        }
      });
  }
}
