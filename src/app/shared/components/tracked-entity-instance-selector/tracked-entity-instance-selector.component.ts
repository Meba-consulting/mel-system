import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { map, filter } from 'lodash';

@Component({
  selector: 'app-tracked-entity-instance-selector',
  templateUrl: './tracked-entity-instance-selector.component.html',
  styleUrls: ['./tracked-entity-instance-selector.component.css'],
})
export class TrackedEntityInstanceSelectorComponent implements OnInit {
  @Input() queryData: any;
  @Output() trackedEntityInstance = new EventEmitter<any>();
  trackedEntityInstances: any[] = [];
  headers: any;
  cardData: any[];
  constructor() {}

  ngOnInit(): void {
    console.log('trackedEntityInstances', this.queryData);
    this.headers = map(
      filter(this.queryData?.headers, (header, index) => {
        if (index >= 7) {
          return header;
        }
      }),
      (header, index) => {
        return {
          index: index + 7,
          name: header?.column,
          id: header?.name,
        };
      }
    );

    console.log(this.headers);

    this.cardData = map(this.queryData.rows, (row) => {
      let formattedRow = map(this.headers, (header) => {
        return {
          id: row[0],
          value: row[header?.index],
          name: header?.name,
        };
      });
      console.log(formattedRow);
      return formattedRow;
    });

    console.log('card data', this.cardData);
  }

  getTrackedEntityInstance(e, item) {
    e.stopPropagation();
    this.trackedEntityInstance.emit(item);
  }
}
