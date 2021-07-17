import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import * as _ from 'lodash';
import { FormValue } from '../../modules/forms/models/form-value.model';

@Component({
  selector: 'app-tracked-entrity-entry-form',
  templateUrl: './tracked-entrity-entry-form.component.html',
  styleUrls: ['./tracked-entrity-entry-form.component.css'],
})
export class TrackedEntrityEntryFormComponent implements OnInit, OnChanges {
  @Input() trackedEntityType: any;
  formFields: any;
  @Input() reportingDate: Date;
  @Input() formData: any;
  currentFormData: any;
  @Output() dataValues = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.currentFormData = _.keyBy(
      _.map(Object.keys(this.formData), (key) => {
        return {
          id: key,
          key: key,
          value: (_.filter(
            this.trackedEntityType.trackedEntityTypeAttributes,
            (attr) => {
              if (attr.trackedEntityAttribute?.id === key) {
                return attr;
              }
            }
          ) || [])[0]?.trackedEntityAttribute?.optionSet
            ? (_.filter(
                (_.filter(
                  this.trackedEntityType.trackedEntityTypeAttributes,
                  (attr) => {
                    if (attr.trackedEntityAttribute?.id === key) {
                      return attr;
                    }
                  }
                ) || [])[0]?.trackedEntityAttribute?.optionSet?.options,
                (option) => {
                  if (option?.name === this.formData[key]?.value) {
                    return option;
                  }
                }
              ) || [])[0]?.id
            : this.formData[key]?.value,
        };
      }),
      'key'
    );
    // create form fieldsoptionSet
    this.formFields = _.filter(
      _.map(
        this.trackedEntityType?.trackedEntityTypeAttributes,
        (attribute) => {
          if (
            attribute?.trackedEntityAttribute?.id !== 'C1i3bPWYBRG' ||
            attribute?.trackedEntityAttribute?.id !== 'ek3AWEEIOBJ'
          )
            return {
              id: attribute?.trackedEntityAttribute?.id,
              label: attribute?.trackedEntityAttribute?.name,
              key: attribute?.trackedEntityAttribute?.id,
              controlType:
                attribute?.trackedEntityAttribute?.valueType == 'TEXT' &&
                !attribute?.trackedEntityAttribute?.optionSet
                  ? 'textbox'
                  : attribute?.trackedEntityAttribute?.valueType ==
                      'LONG_TEXT' &&
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
                  : attribute?.trackedEntityAttribute?.valueType == 'email'
                  ? 'email'
                  : attribute?.trackedEntityAttribute?.valueType ==
                    'phoneNumber'
                  ? 'phoneNumber'
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
                        name: option?.name,
                        label: option?.name,
                        key: option?.id,
                      };
                    }
                  )
                : [],
              required: attribute?.mandatory,
            };
        }
      ),
      (field) => field
    );
  }

  onFormUpdate(formValues: FormValue) {
    this.dataValues.emit(formValues.getValues());
    this.isFormValid.emit(formValues.isValid);
  }
}
