import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createFormFieldsFromProgramStageDataElement } from 'src/app/core/helpers/create-form-fields.helper';
import { FormValue } from '../../modules/forms/models/form-value.model';

import * as _ from 'lodash';
import { sanitizeMultipleSelectionsOptions } from 'src/app/core/helpers/auto-create-value-for-multiple-selections.helper';
import { DataService } from 'src/app/core/services/data.service';

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
  @Input() currentUser: any;
  formFields: any[];
  currentFormData: any = {};
  @Output() formValuesData = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  @Output() editIsSet = new EventEmitter<boolean>();
  isEditSet: boolean = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
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
      const matchedFormField = (this.formFields.filter(
        (field) =>
          field?.id ===
          this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id
      ) || [])[0];
      this.currentFormData[
        this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id
      ] = {
        id: this.programDataStoreConfigs?.stagesConfigs[this.stage?.id]?.id,
        options: matchedFormField ? matchedFormField?.options : [],
        value:
          this.programDataStoreConfigs?.stagesConfigs[this.stage?.id][
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

    this.editIsSet.emit(this.isEditSet);
  }

  onFormUpdate(formValues: FormValue, configs, programStateDataElements) {
    this.isFormValid.emit(formValues.isValid);
    const formDataValues = formValues.getValues();
    let formattedDataValues = Object.keys(formDataValues).map((key) => {
      return {
        ...formDataValues[key],
        value:
          configs['multipleSelections'] && configs['multipleSelections'][key]
            ? sanitizeMultipleSelectionsOptions(
                formDataValues[key],
                programStateDataElements
              )
            : formDataValues[key]?.value,
      };
    });
    this.formValuesData.emit(formValues.getValues());
    this.editIsSet.emit(this.isEditSet);
  }
}
