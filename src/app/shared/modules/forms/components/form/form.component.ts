import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.model';
import { FormValue } from '../../models/form-value.model';
import { FieldControlService } from '../../services/field-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() fields: Field<string>[];
  @Input() isFormHorizontal: boolean;
  @Input() showSaveButton: boolean;
  @Input() fieldsData: any;
  @Input() shouldRenderAsCheckBoxesButton: boolean;

  @Output() formUpdate: EventEmitter<any> = new EventEmitter<any>();

  values: any;

  form: FormGroup;
  payload = '';

  constructor(private fieldControlService: FieldControlService) {}

  ngOnChanges(): void {
    this.form = this.fieldControlService.toFormGroup(
      this.fields,
      this.fieldsData
    );
    this.values = this.form.getRawValue();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.formUpdate.emit(this.form.getRawValue());
  }

  onFieldUpdate(form: FormGroup): void {
    if (!this.showSaveButton && form) {
      this.formUpdate.emit(new FormValue(this.form, this.fields));

      this.values = form.getRawValue();
    }
  }

  onClear(): void {
    this.form.reset();
  }

  isFormInValid() {
    return this.form.invalid;
  }
}
