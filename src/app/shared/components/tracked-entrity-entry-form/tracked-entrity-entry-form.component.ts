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
  currentFormData: any;
  @Output() dataValues = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    // console.log(this.trackedEntityAttributes);
    // create form fields
    this.formFields = _.filter(
      _.map(
        this.trackedEntityType?.trackedEntityTypeAttributes,
        (attribute) => {
          console.log(attribute);
          if (attribute?.trackedEntityAttribute?.id !== 'C1i3bPWYBRG')
            return {
              id: attribute?.trackedEntityAttribute?.id,
              label: attribute?.trackedEntityAttribute?.name,
              key: attribute?.trackedEntityAttribute?.id,
              controlType:
                attribute?.trackedEntityAttribute?.valueType == 'TEXT' &&
                !attribute?.trackedEntityAttribute?.optionSet
                  ? 'textbox'
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
                attribute?.trackedEntityAttribute?.valueType ==
                  'INTEGER_ZERO_OR_POSITIVE' &&
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
              required: true,
            };
        }
      ),
      (field) => field
    );
    console.log('form fields #########', this.formFields);
  }

  onFormUpdate(formValues: FormValue) {
    this.dataValues.emit(formValues.getValues());
    this.isFormValid.emit(formValues.isValid);
  }
}
