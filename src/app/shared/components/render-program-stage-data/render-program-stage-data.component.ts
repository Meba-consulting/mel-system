import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as _ from 'lodash';
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
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() updated = new EventEmitter<boolean>();
  @Output() countOfEvents = new EventEmitter<number>();
  eventsData: any;
  formattedDataElements: any = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const dataElements = _.keyBy(
      _.map(
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
      ),
      'dataElement'
    );

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
            name: dataElements[dataValue?.dataElement],
          };
        });
        this.eventsData = [...this.eventsData, data];
        this.countOfEvents.emit(this.eventsData?.length);
        // console.log('eventsData', this.eventsData);
      }
    );
  }

  onEdit(e, data) {
    e.stopPropagation();
    this.edit.emit(data?.event);
  }

  onDelete(e, data) {
    e.stopPropagation();
    this.delete.emit(data?.event);
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
