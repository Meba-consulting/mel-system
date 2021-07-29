import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aggegate-data-entry-home',
  templateUrl: './aggegate-data-entry-home.component.html',
  styleUrls: ['./aggegate-data-entry-home.component.css'],
})
export class AggegateDataEntryHomeComponent implements OnInit {
  @Input() dataSet: any;
  @Input() currentUser: any;
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
  constructor() {}

  ngOnInit(): void {
    console.log('dataSet', this.dataSet);
  }

  detailsOfTheChangedValue(data) {
    console.log('detailsOfTheChangedValue', data);
    const domElementId = data.domElementId;
    this.statusUpdateOnDomElement.domElementId = data.domElementId;
    this.statusUpdateOnDomElement.id = data.id;
    this.statusUpdateOnDomElement.colorKey = 'OK';
    this.statusUpdateOnDomElement.status = 'synched';
    this.statusUpdateOnDomElement.value = data.value;
    let dataObject = {};
    dataObject[data?.id] = data;
    this.customFormDataValues = {
      ...this.customFormDataValues,
      ...dataObject,
    };
    this.statusArr.push(this.statusUpdateOnDomElement);
  }
}
