import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class FieldControlService {
  constructor() {}

  toFormGroup(fields: Field<string>[], fieldsData?: any): FormGroup {
    const group: any = {};
    fields.forEach((field) => {
      const fieldData = fieldsData ? fieldsData[field.id] : null;
      group[field.key] =
        field.required &&
        field.controlType !== 'username' &&
        field.controlType !== 'email' &&
        field.controlType !== 'password' &&
        field.controlType !== 'phoneNumber'
          ? new FormControl(
              fieldData?.value || field.value || '',
              Validators.required
            )
          : field.controlType == 'username'
          ? new FormControl(
              fieldData?.value || field.value || '',
              field.required
                ? [Validators.required, Validators.minLength(4)]
                : [Validators.minLength(4)]
            )
          : field.controlType == 'phoneNumber'
          ? new FormControl(
              fieldData?.value || field.value || '',
              field.required
                ? [Validators.required, Validators.pattern('[7-9]{1}[0-9]{8}')]
                : [Validators.pattern('[7-9]{1}[0-9]{8}')]
            )
          : field.controlType == 'email'
          ? new FormControl(
              fieldData?.value || field.value || '',
              field.required
                ? [Validators.required, Validators.email]
                : [Validators.email]
            )
          : field.controlType == 'password'
          ? new FormControl(fieldData?.value || field.value || '', [
              Validators.required,
              Validators.pattern(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g
              ),
            ])
          : field.controlType == 'rePassword'
          ? new FormControl(fieldData?.value || field.value || '', [
              Validators.required,
              Validators.pattern(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/g
              ),
            ])
          : new FormControl(fieldData?.value || field.value || '');
    });
    return new FormGroup(group);
  }
}
