import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-render-program-stage-data',
  templateUrl: './render-program-stage-data.component.html',
  styleUrls: ['./render-program-stage-data.component.css'],
})
export class RenderProgramStageDataComponent implements OnInit {
  @Input() data: any;
  @Input() programStage: any;
  @Input() program: any;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  eventsData: any = [];
  formattedDataElements: any = [];
  constructor() {}

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
    console.log('DATA ELEME', dataElements);

    this.formattedDataElements = _.filter(this.formattedDataElements, {
      displayInReports: true,
    });

    // console.log('formattedDataElements', this.formattedDataElements);
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
        // console.log('eventsData', this.eventsData);
      }
    );
  }

  onEdit(e, data) {
    e.stopPropagation();
    console.log(data);
    this.edit.emit(data?.event);
  }

  onDelete(e, data) {
    e.stopPropagation();
    this.delete.emit(data?.event);
  }
}
