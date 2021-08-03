import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import * as _ from 'lodash';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

@Component({
  selector: 'app-default-form-entry',
  templateUrl: './default-form-entry.component.html',
  styleUrls: ['./default-form-entry.component.css'],
})
export class DefaultFormEntryComponent implements OnInit, OnChanges {
  @Input() isTrackedEntityInstanceAttributes: boolean;
  @Input() trackedEntityType: any;
  @Input() trackedEntityAttributes: any[];
  @Input() dataElements: any[];
  @Input() programName: string;
  formFields: any;
  currentFormData: any;
  @Output() formData = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    // create form fields
    if (this.isTrackedEntityInstanceAttributes) {
      this.formFields = _.map(
        this.trackedEntityType?.trackedEntityTypeAttributes,
        (attribute) => {
          return {
            id: attribute?.trackedEntityAttribute?.id,
            label: attribute?.trackedEntityAttribute?.name,
            key: attribute?.trackedEntityAttribute?.id,
            controlType:
              attribute?.trackedEntityAttribute?.valueType == 'TEXT' &&
              !attribute?.trackedEntityAttribute?.optionSet
                ? 'textbox'
                : attribute?.trackedEntityAttribute?.valueType == 'LONG_TEXT' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 'textarea'
                : attribute?.trackedEntityAttribute?.valueType == 'DATE' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 'date'
                : attribute?.trackedEntityAttribute?.optionSet
                ? 'dropdown'
                : attribute?.trackedEntityAttribute?.valueType ==
                    'INTEGER_ZERO_OR_POSITIVE' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 'number'
                : 'textbox',
            type:
              (attribute?.trackedEntityAttribute?.valueType ==
                'INTEGER_ZERO_OR_POSITIVE' ||
                attribute?.trackedEntityAttribute?.valueType ==
                  'INTEGER_POSITIVE') &&
              !attribute?.trackedEntityAttribute?.optionSet
                ? 'number'
                : null,
            min:
              attribute?.trackedEntityAttribute?.valueType ==
                'INTEGER_ZERO_OR_POSITIVE' &&
              !attribute?.trackedEntityAttribute?.optionSet
                ? 0
                : attribute?.trackedEntityAttribute?.valueType ==
                    'INTEGER_POSITIVE' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 1
                : null,
            name: attribute?.trackedEntityAttribute?.name,
            required: attribute?.mandatory,
            options: attribute?.trackedEntityAttribute?.optionSet
              ? _.map(
                  attribute?.trackedEntityAttribute?.optionSet?.options,
                  (option) => {
                    return {
                      id: option?.id,
                      name: option?.code,
                      label: option?.name,
                      key: option?.id,
                    };
                  }
                )
              : [],
          };
        }
      );
    }
    // console.log('form fields', this.formFields);
  }

  ngOnChanges(): void {
    // create form fields
    if (this.isTrackedEntityInstanceAttributes) {
      this.formFields = _.map(
        this.trackedEntityType?.trackedEntityTypeAttributes,
        (attribute) => {
          return {
            id: attribute?.trackedEntityAttribute?.id,
            label: attribute?.trackedEntityAttribute?.name,
            key: attribute?.trackedEntityAttribute?.id,
            controlType:
              attribute?.trackedEntityAttribute?.valueType == 'TEXT' &&
              !attribute?.trackedEntityAttribute?.optionSet
                ? 'textbox'
                : attribute?.trackedEntityAttribute?.valueType == 'LONG_TEXT' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 'textarea'
                : attribute?.trackedEntityAttribute?.valueType == 'DATE' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 'date'
                : attribute?.trackedEntityAttribute?.optionSet
                ? 'dropdown'
                : attribute?.trackedEntityAttribute?.valueType ==
                    'INTEGER_ZERO_OR_POSITIVE' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 'number'
                : 'textbox',
            type:
              (attribute?.trackedEntityAttribute?.valueType ==
                'INTEGER_ZERO_OR_POSITIVE' ||
                attribute?.trackedEntityAttribute?.valueType ==
                  'INTEGER_POSITIVE') &&
              !attribute?.trackedEntityAttribute?.optionSet
                ? 'number'
                : null,
            min:
              attribute?.trackedEntityAttribute?.valueType ==
                'INTEGER_ZERO_OR_POSITIVE' &&
              !attribute?.trackedEntityAttribute?.optionSet
                ? 0
                : attribute?.trackedEntityAttribute?.valueType ==
                    'INTEGER_POSITIVE' &&
                  !attribute?.trackedEntityAttribute?.optionSet
                ? 1
                : null,
            name: attribute?.trackedEntityAttribute?.name,
            options: attribute?.trackedEntityAttribute?.optionSet
              ? _.map(
                  attribute?.trackedEntityAttribute?.optionSet?.options,
                  (option) => {
                    return {
                      id: option?.id,
                      name: option?.code,
                      label: option?.name,
                      key: option?.id,
                    };
                  }
                )
              : [],
            required: true,
          };
        }
      );
    }
    // console.log('form fields', this.formFields);
  }

  onFormUpdate(formValue: FormValue) {
    this.formData.emit(formValue.getValues());
    this.isFormValid.emit(formValue.isValid);
  }
}
