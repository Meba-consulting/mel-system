import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() eventSet: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {
    if (this.events) {
      this.objectForRenderingValues = createEventsDataValuesObject(
        this.dataElements,
        this.events
      );
    }
  }
  onEventSet(e) {
    this.eventSet.emit(e);
  }
}
