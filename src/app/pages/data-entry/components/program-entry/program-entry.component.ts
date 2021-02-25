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
    this.getTrackedEntityInstanceData({
      orgUnit: this.orgUnit?.id,
      program: this.program?.id,
    });

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
    if (type == 'entry') {
      this.isListReportSet = false;
    } else {
      this.isListReportSet = true;
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
    // this.events$ = this.httpClient.get(
    //   'events.json?paging=false&?program=' +
    //     this.program.id +
    //     '&orgUnit=' +
    //     this.orgUnit.id
    // );
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
    console.log(dataValues);
    this.eventsData.dataValues = dataValues;
    console.log('eventsData', this.eventsData);
    this.eventsData.eventDate = !this.eventsData?.eventDate
      ? formatDateToYYMMDD(new Date())
      : this.eventsData?.eventDate;
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

  onSetEdit(e, trackedEntityInstance) {
    e.stopPropagation();
    console.log(trackedEntityInstance);
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
                this.queryResponseData$ = this.dataService.getTrackedEntityInstances(
                  {
                    orgUnit: this.orgUnit?.id,
                    program: this.program?.id,
                  }
                );
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
      width: '100%',
      height: '650px',
      maxWidth: '90vw',
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
          this.queryResponseData$ = this.dataService.getTrackedEntityInstances({
            orgUnit: this.orgUnit?.id,
            program: this.program?.id,
          });

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
    console.log(e);
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
}
