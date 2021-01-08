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

  isFormValid: boolean = false;
  isFormForEntitiesValid: boolean = false;
  currentTrackedEntityInstanceId: string;

  eventsData: any = {};

  loadStageData: boolean = false;

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
      eventDate: '',
    };
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

  onGetFormValuesData(data) {
    let dataValues = [];
    dataValues = _.filter(
      _.map(Object.keys(data), (key) => {
        if (data[key] || data[key] !== '')
          return {
            dataElement: key,
            value: data[key]?.value,
          };
      }),
      (dataValue) => dataValue
    );
    console.log(dataValues);
    this.eventsData.dataValues = dataValues;
    console.log('eventsData', this.eventsData);
  }

  onSaveData(e, programStage?) {
    e.stopPropagation();
    this.loadStageData = false;
    this.eventsData.programStage = programStage?.id;
    this.dataService
      .saveEventsData({ events: [this.eventsData] })
      .subscribe((response) => {
        console.log(response);
        this.loadStageData = true;
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
    console.log(trackedEntityInstance);
    this.loadStageData = false;
    this.currentTrackedEntityInstanceId = null;
    this.eventsData.trackedEntityInstance = trackedEntityInstance?.id;
    this.eventsData.enrollment = trackedEntityInstance?.id;
    setTimeout(() => {
      this.currentTrackedEntityInstanceId = trackedEntityInstance?.id;
      this.loadStageData = true;
    }, 500);
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
}
