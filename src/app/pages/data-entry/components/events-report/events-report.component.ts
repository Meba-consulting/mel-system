import { Component, OnInit, Input } from '@angular/core';
import { formatEventsDataIntoKeyValuePair } from '../../helpers';

@Component({
  selector: 'app-events-report',
  templateUrl: './events-report.component.html',
  styleUrls: ['./events-report.component.css']
})
export class EventsReportComponent implements OnInit {
  @Input() events: any[];
  @Input() reportElements: any[];
  constructor() {}

  ngOnInit(): void {}
}
