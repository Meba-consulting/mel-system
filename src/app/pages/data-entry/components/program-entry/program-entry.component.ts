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
  @Input() indicators: any = {};
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
    console.log('hereeeeeeeee', this.program);
    this.getTrackedEntityInstanceData({
      orgUnit: this.orgUnit?.id,
      program: this.program?.id,
    });
    // this.elementsToDisable = [...this.elementsToDisable, this.orgUnit.id];
    // this.dataElements = getDataElementsFromProgram(
    //   this.program.programStages[0]['programStageDataElements']
    // );
    // this.indicators = formatProgrgamIndicators(this.program.programIndicators);
    // const dimensions = {
    //   ou: this.orgUnit.id,
    //   program: this.program.id,
    //   programStage: this.program.programStages[0].id,
    // };
    // this.events$ = this.dataEntryService.getEventsData(dimensions);
    // this.events$.subscribe((response) => {
    //   if (response) {
    //     setTimeout(() => {
    //       this.events = response['events'];
    //     }, 700);
    //     setTimeout(() => {
    //       this.eventLoaded = true;
    //     }, 2000);
    //   }
    // });
  }

  getTrackedEntityInstanceData(parameters) {
    console.log('parameters', parameters);
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
    this.dateChanged = false;
    setTimeout(() => {
      this.dateChanged = true;
    }, 500);
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
    console.log(data);
  }

  onGetFormValidity(e) {
    this.isFormValid = e;
  }

  onSaveData(e) {
    e.stopPropagation();
  }

  saveData() {
    const eventData = {
      status: 'COMPLETED',
      eventDate: this.reportingDate,
      notes: [],
      completedDate: this.reportingDate,
      program: this.program.id,
      programStage: this.program.programStages[0].id,
      orgUnit: this.orgUnit.id,
      dataValues: this.dataValues,
    };
    this.eventSaveMessage = 'Saving data................';
    this.eventLoaded = false;
    this.httpClient.post('events', eventData).subscribe((response) => {
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
}
