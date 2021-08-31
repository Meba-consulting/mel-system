import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { getCurrentUser, State } from 'src/app/store';
import { UpdateStatusModalComponent } from '../update-status-modal/update-status-modal.component';

@Component({
  selector: 'app-render-program-stage-data',
  templateUrl: './render-program-stage-data.component.html',
  styleUrls: ['./render-program-stage-data.component.css'],
})
export class RenderProgramStageDataComponent implements OnInit {
  @Input() data: any;
  @Input() programStage: any;
  @Input() programDataStoreConfigs: any;
  @Input() program: any;
  @Input() orgUnit: any;
  @Input() showEdit: boolean;
  @Input() currentUser: any;
  @Input() category: string;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() updated = new EventEmitter<boolean>();
  @Output() countOfEvents = new EventEmitter<number>();
  eventsData: any;
  formattedDataElements: any = [];
  stageDataElements: any;
  currentUser$: Observable<any>;

  constructor(private dialog: MatDialog, private store: Store<State>) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(getCurrentUser);
    this.stageDataElements = _.map(
      this.programStage?.programStageDataElements,
      (programStageDataElement) => {
        this.formattedDataElements = [
          ...this.formattedDataElements,
          {
            id: programStageDataElement?.dataElement?.id,
            dataElement: programStageDataElement?.dataElement?.id,
            name: programStageDataElement?.dataElement?.name,
            displayInReports: programStageDataElement?.displayInReports,
            hasOptions: programStageDataElement?.dataElement?.optionSet
              ? true
              : false,
            options: programStageDataElement?.dataElement?.optionSet
              ? _.keyBy(
                  programStageDataElement?.dataElement?.optionSet?.options,
                  'id'
                )
              : {},
          },
        ];
        return {
          dataElement: programStageDataElement?.dataElement?.id,
          name: programStageDataElement?.dataElement?.name,
          displayInReports: programStageDataElement?.displayInReports,
        };
      }
    );
    const dataElements = _.keyBy(this.stageDataElements, 'dataElement');

    this.formattedDataElements = _.filter(this.formattedDataElements, {
      displayInReports: true,
    });

    this.eventsData = [];

    _.map(
      _.filter(this.data?.enrollments[0]?.events, {
        programStage: this.programStage?.id,
      }),
      (event) => {
        let data = { event: event };
        _.each(event?.dataValues, (dataValue: any) => {
          data[dataValue?.dataElement] = {
            value: dataValue?.value,
            isFile:
              (
                this.programStage?.programStageDataElements.filter(
                  (programStageDataElement) =>
                    programStageDataElement?.dataElement?.valueType ===
                      'FILE_RESOURCE' &&
                    programStageDataElement?.dataElement.id ===
                      dataValue?.dataElement
                ) || []
              )?.length > 0,
            dataElement: dataValue?.dataElement,
            name: dataElements[dataValue?.dataElement],
          };
        });
        this.eventsData = [...this.eventsData, data];
        this.countOfEvents.emit(this.eventsData?.length);
        // console.log('eventsData', this.eventsData);
      }
    );
  }

  onEdit(data) {
    this.edit.emit(data);
  }

  onDelete(data) {
    this.delete.emit(data);
  }

  onUpdateStatus(e, data, stagesToUpdateStatus) {
    e.stopPropagation();
    this.dialog
      .open(UpdateStatusModalComponent, {
        width: '30%',
        height: '250px',
        disableClose: false,
        data: {
          programStage: this.programStage,
          program: this.program,
          eventData: data,
          orgUnit: this.orgUnit,
          programDataStoreConfigs: this.programDataStoreConfigs,
        },
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe((e) => {
        if (e) {
          this.updated.emit(e);
        }
      });
  }
}
