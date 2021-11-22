import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Field } from '../../models/field.model';
import { FieldItemService } from '../../services/field-items.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {
  @Input() field: Field<string>;
  @Input() form: FormGroup;
  @Input() isCheckBoxButton: boolean;
  @Input() fieldClass: string;
  file: any;

  @Output()
  fieldUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  hide = true;
  hideRepeat = true;
  members$: Observable<any[]>;

  constructor(private fieldItemService: FieldItemService) {}

  ngOnInit(): void {
    this.members$ = of(this.field?.options);
  }

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

  get isFile(): boolean {
    return this.field.controlType === 'file';
  }

  get isCommonField(): boolean {
    return (
      !this.isCheckBoxButton && !this.isDate && !this.isBoolean && !this.isFile
    );
  }

  get fieldId(): string {
    return this.field?.id;
  }

  onFieldUpdate(controlType): void {
    this.fieldUpdate.emit(this.form);
  }

  fileSelection(event, field) {
    const element: HTMLElement = document.getElementById('fileSelector');
    this.file = element.id;
    const data = {
      resourceName: event.target.files[0].name,
      resourceType: 'DATA_VALUE',
      attachment: true,
      file: event.target.files[0],
      url: '',
    };
    let val = {};
    val[field?.key] = data;
    this.form.patchValue(val);
    this.fieldUpdate.emit(this.form);
  }

  searchItem(event): void {
    const searchingText = event.target.value;
    this.members$ = this.fieldItemService.searchItemService(this.field, {
      q: searchingText,
    });
  }

  getSelectedItemFromOption(event: Event, item, key): void {
    event.stopPropagation();
    const value = item?.key;
    let objectToUpdate = {};
    objectToUpdate[key] = value;
    this.form.patchValue(objectToUpdate);
    this.fieldUpdate.emit(this.form);
  }
}
