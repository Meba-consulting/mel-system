import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
  @Input() field: Field<string>;
  @Input() form: FormGroup;
  @Input() isCheckBoxButton: boolean;
  @Input() fieldClass: string;

  @Output()
  fieldUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  hide = true;
  hideRepeat = true;

  get isValid(): boolean {
    // console.log('controls', this.form.controls[this.field.id]);
    return this.form?.controls[this.field.id]?.valid;
  }

  get isDate(): boolean {
    return this.field.controlType === 'date';
  }

  get isBoolean(): boolean {
    return this.field.controlType === 'boolean';
  }

  get isCommonField(): boolean {
    return !this.isCheckBoxButton && !this.isDate && !this.isBoolean;
  }

  get fieldId(): string {
    return this.field?.id;
  }

  onFieldUpdate(controlType): void {
    console.log(controlType);
    this.fieldUpdate.emit(this.form);
  }
}
