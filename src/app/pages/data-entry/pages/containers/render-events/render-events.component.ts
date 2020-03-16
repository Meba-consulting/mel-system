import { Component, OnInit, Input } from '@angular/core';
import { createEventsDataValuesObject } from '../../../helpers';

@Component({
  selector: 'app-render-events',
  templateUrl: './render-events.component.html',
  styleUrls: ['./render-events.component.css']
})
export class RenderEventsComponent implements OnInit {
  @Input() events: any;
  @Input() dataElements: any;
  constructor() {}

  ngOnInit(): void {}
}
