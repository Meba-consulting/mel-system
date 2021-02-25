import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formatEventsForListing } from 'src/app/core/helpers/format-events-for-listing.helper';

@Component({
  selector: 'app-event-program-data',
  templateUrl: './event-program-data.component.html',
  styleUrls: ['./event-program-data.component.css'],
})
export class EventProgramDataComponent implements OnInit {
  @Input() events: any[];
  @Input() program: any;
  programStageDataElements: any[];
  formattedEventsData: any[];
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    this.programStageDataElements = this.program?.programStages[0]?.programStageDataElements.map(
      (elem) => {
        return { ...elem?.dataElement, compulsory: elem?.compulsory };
      }
    );
    this.formattedEventsData = formatEventsForListing(
      this.events,
      this.programStageDataElements
    );
  }

  onEditEvent(event) {
    this.editEvent.emit(event);
  }

  onDeleteEvent(event) {
    this.deleteEvent.emit(event);
  }
}
