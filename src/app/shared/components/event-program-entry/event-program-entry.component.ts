import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { keyBy } from 'lodash';

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
  @Output() entryInfo = new EventEmitter<any>();
  @Input() elementsDataValues: any;
  dataElements: any[];
  dataValues: any = {};
  statusArr: any[] = [];
  statusUpdateOnDomElement = {
    colorKey: 'WAIT',
    domElementId: 'VdOajI8PwGd-RXDbRXHscFp-val',
    id: 'RXDbRXHscFp-dataElement',
    status: 'not-synced',
    value: '333',
  };
  customFormDataValues = {};
  @Input() formValuesArray: any[];
  constructor() {}

  ngOnInit(): void {
    this.customFormDataValues = {};
    this.dataValues = this.elementsDataValues;
    if (this.elementsDataValues) {
      this.customFormDataValues = this.elementsDataValues;
    }
    this.programStageDataElements = this.program?.programStages[0]?.programStageDataElements.map(
      (elem) => {
        return { ...elem?.dataElement, compulsory: elem?.compulsory };
      }
    );
  }

  detailsOfTheChangedValue(e) {
    const domElementId = e.domElementId;
    this.statusUpdateOnDomElement.domElementId = e.domElementId;
    this.statusUpdateOnDomElement.id = e.id;
    this.statusUpdateOnDomElement.colorKey = 'OK';
    this.statusUpdateOnDomElement.status = 'synched';
    this.statusUpdateOnDomElement.value = e.value;
    let dataObject = {};
    dataObject[e?.id] = e;
    this.customFormDataValues = {
      ...this.customFormDataValues,
      ...dataObject,
    };
    this.statusArr.push(this.statusUpdateOnDomElement);
    this.entryInfo.emit(this.customFormDataValues);
  }

  onDataValueChange(e) {
    this.dataValues = { ...this.dataValues, ...e };
    this.dataValuesChanges.emit(this.dataValues);
  }

  onCheckValidity(e) {
    this.isFormValid.emit(e);
  }
}
