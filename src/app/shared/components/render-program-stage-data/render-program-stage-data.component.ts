import { Component, Input, OnInit } from '@angular/core';

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
              dataElement: programStageDataElement?.dataElement?.id,
              name: programStageDataElement?.dataElement?.name,
            },
          ];
          return {
            dataElement: programStageDataElement?.dataElement?.id,
            name: programStageDataElement?.dataElement?.name,
          };
        }
      ),
      'dataElement'
    );
    _.map(
      _.filter(this.data?.enrollments[0]?.events, {
        programStage: this.programStage?.id,
      }),
      (event) => {
        let dataValuesRows = [];
        _.each(event?.dataValues, (dataValue) => {
          dataValuesRows = [
            ...dataValuesRows,
            {
              value: dataValue?.value,
              name: dataElements[dataValue?.dataElement],
            },
          ];
        });
        this.eventsData = [...this.eventsData, dataValuesRows];
      }
    );
  }
}
