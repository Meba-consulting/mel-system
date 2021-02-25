import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as _ from 'lodash';
import { FormValue } from '../../modules/forms/models/form-value.model';

@Component({
  selector: 'app-program-section',
  templateUrl: './program-section.component.html',
  styleUrls: ['./program-section.component.css'],
})
export class ProgramSectionComponent implements OnInit {
  @Input() programStageSection: any;
  @Input() programStageDataElements: any[];
  formFields: any[];
  @Input() data: any;
  currentFormData: any = {};
  @Output() dataValues = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    this.currentFormData = this.data;
    this.formFields = _.map(
      this.programStageSection?.dataElements,
      (dataElement) => {
        const details = (this.programStageDataElements.filter(
          (elem) => elem?.id == dataElement?.id
        ) || [])[0];
        return {
          id: dataElement?.id,
          label: dataElement?.name,
          key: dataElement?.id,
          controlType:
            details?.valueType == 'LONG_TEXT'
              ? 'textarea'
              : details?.valueType == 'TEXT' && !details?.optionSet
              ? 'textbox'
              : details?.valueType === 'NUMBER' ||
                details?.valueType === 'INTEGER_ZERO_OR_POSITIVE' ||
                details?.valueType === 'INTEGER_POSITIVE'
              ? 'number'
              : details?.valueType == 'DATE'
              ? 'date'
              : details?.optionSet
              ? 'dropdown'
              : details?.valueType == 'email'
              ? 'email'
              : details?.valueType == 'phoneNumber'
              ? 'phoneNumber'
              : 'textbox',

          type:
            details?.valueType == 'INTEGER_ZERO_OR_POSITIVE' ||
            details?.valueType == 'INTEGER_POSITIVE' ||
            details?.valueType == 'NUMBER'
              ? 'number'
              : null,
          min:
            details?.valueType == 'INTEGER_ZERO_OR_POSITIVE'
              ? 0
              : details?.valueType == 'INTEGER_POSITIVE'
              ? 1
              : null,
          options: details?.optionSet
            ? _.map(details?.optionSet?.options, (option) => {
                return {
                  id: option?.id,
                  name: option?.name,
                  label: option?.name,
                  key: option?.id,
                };
              })
            : [],
          required: details?.compulsory,
        };
      }
    );
  }
  onFormUpdate(formValues: FormValue) {
    this.dataValues.emit(formValues.getValues());
    this.isFormValid.emit(formValues.isValid);
  }
}
