import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-dhis2-custom-forms-entry',
  templateUrl: './ngx-dhis2-custom-forms-entry.component.html',
  styles: [],
})
export class NgxDhis2CustomFormsEntryComponent implements OnInit {
  @Input() htmlCustomForm: any;
  @Input() dataElements: any;
  @Output() onCustomFormInputChange = new EventEmitter();
  @Input() statusUpdateOnDomElement: any;
  @Input() formType: string;
  @Input() formId: string;
  @Input() elementsDataValues: any;
  @Input() indicators: any;
  @Input() lastEvent: any;
  @Input() elementsToDisable: string[];
  statusInfo: any;
  constructor() {}

  ngOnInit() {}

  customFormInputChange(e) {
    this.onCustomFormInputChange.emit(e);
  }
}
