import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { map } from 'lodash';

@Component({
  selector: 'app-tracked-entity-instance-selector',
  templateUrl: './tracked-entity-instance-selector.component.html',
  styleUrls: ['./tracked-entity-instance-selector.component.css'],
})
export class TrackedEntityInstanceSelectorComponent implements OnInit {
  @Input() queryData: any;
  @Output() trackedEntityInstance = new EventEmitter<any>();
  trackedEntityInstances: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.trackedEntityInstances = map(this.queryData?.rows, (row) => {
      return {
        id: row[0],
        name: row[7],
      };
    });
  }

  getTrackedEntityInstance(item) {
    this.trackedEntityInstance.emit(item);
  }
}
