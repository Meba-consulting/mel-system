import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { map, filter, each } from 'lodash';

@Component({
  selector: 'app-tracked-entity-instance-selector',
  templateUrl: './tracked-entity-instance-selector.component.html',
  styleUrls: ['./tracked-entity-instance-selector.component.css'],
})
export class TrackedEntityInstanceSelectorComponent implements OnInit {
  @Input() queryData: any;
  @Output() trackedEntityInstance = new EventEmitter<any>();
  @Input() programConfigs: any;
  trackedEntityInstances: any[] = [];
  headers: any;
  cardData: any[];
  formattedCardData: any[] = [];
  elements: any = {};
  constructor() {}

  ngOnInit(): void {
    // console.log('trackedEntityInstances', this.queryData);
    this.headers = map(
      filter(this.queryData?.headers, (header, index) => {
        if (index >= 7) {
          return header;
        }
      }),
      (header, index) => {
        this.elements[header?.name] = header?.column;
        return {
          index: index + 7,
          name: header?.column,
          id: header?.name,
        };
      }
    );
    this.formattedCardData = [];

    this.cardData = map(this.queryData.rows, (row) => {
      let enrollmentsCardSummary = {
        headerElements: ['vbQVsyPWnkz'],
        bodyElements: ['f7IdJe6ykFR'],
        others: ['emM3ijY2HvA'],
        description: this.programConfigs?.enrollmentsCardSummary?.description,
      };

      let formattedRow = map(this.headers, (header) => {
        return {
          id: header?.id,
          value: row[header?.index],
          name: header?.name,
        };
      });

      let data = {
        headerData: this.getDataByColumnId(
          formattedRow,
          this.programConfigs?.enrollmentsCardSummary?.headerElements
        ),
        bodyData: this.getDataByColumnId(
          formattedRow,
          this.programConfigs?.enrollmentsCardSummary?.bodyElements
        ),
        others: this.getDataByColumnId(
          formattedRow,
          this.programConfigs?.enrollmentsCardSummary?.others
        ),
        description: this.programConfigs?.enrollmentsCardSummary?.description,
        item: { id: row[0] },
      };

      this.formattedCardData = [...this.formattedCardData, data];
      return formattedRow;
    });
  }

  getTrackedEntityInstance(e, item) {
    e.stopPropagation();
    this.trackedEntityInstance.emit(item);
  }

  getDataByColumnId(data, ids) {
    // console.log('data##', data);
    // console.log('id##', ids);
    let extractedData = '';
    each(ids, (id) => {
      each(data, (row) => {
        // console.log(ids, row);
        if (row['id'] === id) {
          extractedData += row?.value;
        }
      });
    });
    return extractedData;
  }
}
