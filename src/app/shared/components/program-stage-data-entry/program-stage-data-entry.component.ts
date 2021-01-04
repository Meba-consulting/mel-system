import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createFormFieldsFromProgramStageDataElement } from 'src/app/core/helpers/create-form-fields.helper';
import { FormValue } from '../../modules/forms/models/form-value.model';

@Component({
  selector: 'app-program-stage-data-entry',
  templateUrl: './program-stage-data-entry.component.html',
  styleUrls: ['./program-stage-data-entry.component.css'],
})
export class ProgramStageDataEntryComponent implements OnInit {
  @Input() programStateDataElements: any[];
  formFields: any[];
  currentFormData: any;
  @Output() formValuesData = new EventEmitter<any>();
  @Output() isFormValid = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {
    console.log('programStateDataElements', this.programStateDataElements);
    this.formFields = createFormFieldsFromProgramStageDataElement(
      this.programStateDataElements
    );
    console.log('formFields', this.formFields);
  }

  onFormUpdate(formValues: FormValue) {
    this.isFormValid.emit(formValues.isValid);
    this.formValuesData.emit(formValues.getValues());
  }
}
