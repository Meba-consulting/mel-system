import { Component, Input, OnChanges, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    // console.log(this.trackedEntityAttributes);
    // create form fields
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
              : attribute?.trackedEntityAttribute?.valueType == 'DATE' &&
                !attribute?.trackedEntityAttribute?.optionSet
              ? 'date'
              : attribute?.trackedEntityAttribute?.optionSet
              ? 'dropdown'
              : 'textbox',
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
    );
    console.log('form fields #########', this.formFields);
  }

  onFormUpdate(formValues: FormValue) {
    console.log('dhdhd', formValues.getValues());
  }
}
