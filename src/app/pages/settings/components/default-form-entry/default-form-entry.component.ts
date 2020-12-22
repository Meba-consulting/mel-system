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
    console.log(this.isTrackedEntityInstanceAttributes);
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
              attribute?.trackedEntityAttribute?.valueType == 'TEXT'
                ? 'textbox'
                : attribute?.trackedEntityAttribute?.valueType == 'DATE'
                ? 'date'
                : 'textbox',
            name: attribute?.trackedEntityAttribute?.name,
            required: true,
          };
        }
      );
    }
    // console.log('form fields', this.formFields);
  }

  ngOnChanges(): void {
    console.log(this.trackedEntityAttributes);
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
              attribute?.trackedEntityAttribute?.valueType == 'TEXT'
                ? 'textbox'
                : attribute?.trackedEntityAttribute?.valueType == 'DATE'
                ? 'date'
                : 'textbox',
            name: attribute?.trackedEntityAttribute?.name,
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
