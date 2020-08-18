import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program-entry',
  templateUrl: './program-entry.component.html',
  styleUrls: ['./program-entry.component.css']
})
export class ProgramEntryComponent implements OnInit {
  @Input() program: any;
  @Input() dataEntryFlow: any;
  @Input() orgUnit: any;
  @Input() currentUser: any;
  events$: Observable<any>;
  elementsDataValues: any = {};
  constructor() {}

  ngOnInit(): void {}

  onEntryInfoChange(data) {}
}
