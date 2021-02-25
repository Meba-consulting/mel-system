import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-program-entry',
  templateUrl: './event-program-entry.component.html',
  styleUrls: ['./event-program-entry.component.css'],
})
export class EventProgramEntryComponent implements OnInit {
  @Input() program: any;
  @Input() currentUser: any;
  @Input() data: any;
  programStageDataElements: any[];
  @Output() dataValuesChanges = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  dataValues: any = {};
  constructor() {}

  ngOnInit(): void {
    this.programStageDataElements = this.program?.programStages[0]?.programStageDataElements.map(
      (elem) => {
        return { ...elem?.dataElement, compulsory: elem?.compulsory };
      }
    );
  }

  onDataValueChange(e) {
    this.dataValues = { ...this.dataValues, ...e };
    this.dataValuesChanges.emit(this.dataValues);
  }

  onCheckValidity(e) {
    this.isFormValid.emit(e);
  }
}
