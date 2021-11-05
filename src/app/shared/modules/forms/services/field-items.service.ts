import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Field } from '../models/field.model';

@Injectable({ providedIn: 'root' })
export class FieldItemService {
  constructor() {}

  searchItemService(field, parameters): Observable<any> {
    return of(
      field?.options.filter(
        (option) => option?.name.toLowerCase().indexOf(parameters?.q) > -1
      )
    );
  }
}
