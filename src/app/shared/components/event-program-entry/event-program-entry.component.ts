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
  @Input() formValuesArray: any[];
  constructor() {}

  ngOnInit(): void {
    // console.log('elementsDataValues##', this.elementsDataValues);
    Object.keys(this.elementsDataValues)
      .filter((key) => this.elementsDataValues[key]?.value)
      .map((id) => {
        this.dataValues[id] = {
          domElementId:
            this.program?.programStages[0] + '.' + id.split('-')[0] + '.val',
          id: id,
          value: this.elementsDataValues[id]?.value,
        };
      });
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
    this.formValuesArray = [];
    this.formValuesArray =
      (
        this.formValuesArray.filter(
          (elem) => elem?.id === this.statusUpdateOnDomElement.id
        ) || []
      )?.length == 0
        ? [...this.formValuesArray, this.statusUpdateOnDomElement]
        : this.formValuesArray.map((elem) => {
            if (elem?.id === this.statusUpdateOnDomElement.id) {
              return this.statusUpdateOnDomElement;
            } else {
              return elem;
            }
          });
    console.log('formValuesArraydewewe', this.formValuesArray);
    this.statusArr.push(this.statusUpdateOnDomElement);
    this.entryInfo.emit(this.formValuesArray);
  }

  onDataValueChange(e) {
    this.dataValues = { ...this.dataValues, ...e };
    this.dataValuesChanges.emit(this.dataValues);
  }

  onCheckValidity(e) {
    this.isFormValid.emit(e);
  }
}
