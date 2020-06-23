import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { createEventsDataValuesObject } from '../../../helpers';

@Component({
  selector: 'app-render-events',
  templateUrl: './render-events.component.html',
  styleUrls: ['./render-events.component.css']
})
export class RenderEventsComponent implements OnInit {
  @Input() events: any;
  @Input() dataElements: any;
  @Input() reportListHeaders: Array<any>;
  @Output() eventSet: EventEmitter<string> = new EventEmitter<string>();
  dataValuesObj: any;
  constructor() {}

  ngOnInit(): void {}

  onEventSet(e) {
    this.eventSet.emit(e);
  }
}
