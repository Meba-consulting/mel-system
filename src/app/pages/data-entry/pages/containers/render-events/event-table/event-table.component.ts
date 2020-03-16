import { Component, OnInit, Input } from '@angular/core';
import { createEventsDataValuesObject } from 'src/app/pages/data-entry/helpers';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit {
  @Input() events: any;
  @Input() dataElements: any;
  objectForRenderingValues: any;
  constructor() {}

  ngOnInit(): void {
    if (this.events) {
      this.objectForRenderingValues = createEventsDataValuesObject(
        this.dataElements,
        this.events
      );
    }
  }
}
