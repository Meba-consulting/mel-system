import { Component, Input, OnInit } from '@angular/core';
import { createFormFieldsFromProgramStageDataElement } from 'src/app/core/helpers/create-form-fields.helper';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-non-repeatable-entry',
  templateUrl: './non-repeatable-entry.component.html',
  styleUrls: ['./non-repeatable-entry.component.css'],
})
export class NonRepeatableEntryComponent implements OnInit {
  @Input() programDataStoreConfigs: any;
  @Input() stage: any;
  programStateDataElements: any[];
  programStageFormData: any;
  formFields: any[];
  currentFormData: any = {};
  isFormValid: boolean = false;
  // @Output() formValuesData = new EventEmitter<any>();
  // @Output() isFormValid = new EventEmitter<boolean>();
  // @Output() editIsSet = new EventEmitter<boolean>();
  isEditSet: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.programStateDataElements = this.stage.programStageDataElements;
    this.formFields = createFormFieldsFromProgramStageDataElement(
      this.programStateDataElements,
      this.programDataStoreConfigs,
      this.stage
    );

    let keyedProgramStageDataElements = {};

    _.map(this.programStateDataElements, (programStateDataElement) => {
      keyedProgramStageDataElements[programStateDataElement?.dataElement?.id] =
        programStateDataElement?.dataElement;
    });

    console.log('programStageFormData', this.programStageFormData);
    if (
      this.programDataStoreConfigs?.stagesConfigs &&
      this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]
    ) {
      this.currentFormData[
        this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id
      ] = {
        id: this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id,
        value: this.programDataStoreConfigs?.stagesConfigs[this.stage?.id][
          this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id
        ]?.defaultValue,
      };
    }
    _.map(Object.keys(this.programStageFormData), (key) => {
      this.currentFormData[key] = {
        id: key,
        value: !keyedProgramStageDataElements[key]?.optionSet
          ? this.programStageFormData[key]?.value
          : (_.filter(keyedProgramStageDataElements[key]?.optionSet?.options, {
              name: this.programStageFormData[key]?.value,
            }) || [])[0]?.id,
      };
    });

    this.isEditSet =
      Object.keys(this.programStageFormData)?.length > 0 ? true : false;

    // this.editIsSet.emit(this.isEditSet);

    console.log(this.currentFormData);
  }

  onFormUpdate(formValues: FormValue) {
    this.isFormValid = formValues.isValid;
    // this.formValuesData.emit(formValues.getValues());
    // this.editIsSet.emit(this.isEditSet);
  }
}
