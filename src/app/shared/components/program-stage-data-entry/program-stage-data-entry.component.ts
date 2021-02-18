import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createFormFieldsFromProgramStageDataElement } from 'src/app/core/helpers/create-form-fields.helper';
import { FormValue } from '../../modules/forms/models/form-value.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-program-stage-data-entry',
  templateUrl: './program-stage-data-entry.component.html',
  styleUrls: ['./program-stage-data-entry.component.css'],
})
export class ProgramStageDataEntryComponent implements OnInit {
  @Input() programStateDataElements: any[];
  @Input() programStageFormData: any;
  @Input() queryResponseData: any;
  @Input() programDataStoreConfigs: any;
  @Input() stage: any;
  formFields: any[];
  currentFormData: any = {};
  @Output() formValuesData = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() editIsSet = new EventEmitter<boolean>();
  isEditSet: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log('programDataStoreConfigs', this.programDataStoreConfigs);
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

    if (
      this.programDataStoreConfigs?.stagesConfigs &&
      this.programDataStoreConfigs?.stagesConfigs[this.stage?.id] &&
      !this.programStageFormData[
        this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id
      ]
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

    console.log('programStageFormData', this.programStageFormData);
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

    this.editIsSet.emit(this.isEditSet);

    console.log(this.currentFormData);
  }

  onFormUpdate(formValues: FormValue) {
    this.isFormValid.emit(formValues.isValid);
    this.formValuesData.emit(formValues.getValues());
    this.editIsSet.emit(this.isEditSet);
  }
}
