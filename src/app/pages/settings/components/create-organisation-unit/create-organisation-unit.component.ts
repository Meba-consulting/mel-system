import { Component, Input, OnInit } from '@angular/core';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-create-organisation-unit',
  templateUrl: './create-organisation-unit.component.html',
  styleUrls: ['./create-organisation-unit.component.css'],
})
export class CreateOrganisationUnitComponent implements OnInit {
  formFields: any[];
  currentFormData: any;
  @Input() clubCategories: any[];
  constructor() {}

  ngOnInit(): void {
    this.formFields = [
      {
        id: 'regdate',
        label: 'Registration date',
        key: 'regdate',
        controlType: 'date',
        name: 'Registration date',
        required: true,
      },
      {
        id: 'clubcategory',
        label: 'Club category',
        key: 'clubcategory',
        controlType: 'dropdown',
        name: 'Club category',
        required: true,
        options: this.formulateOptions(this.clubCategories),
      },
      {
        id: 'name',
        label: 'Name',
        key: 'name',
        controlType: 'textbox',
        name: 'Name',
        required: true,
      },
      {
        id: 'shortname',
        label: 'Short name',
        key: 'shortname',
        controlType: 'textbox',
        name: 'Short name',
        required: true,
      },
      {
        id: 'shortname',
        label: 'Short name',
        key: 'shortname',
        controlType: 'textbox',
        name: 'Short name',
        required: true,
      },
    ];

    console.log('formFields', this.formFields);
  }

  formulateOptions(options) {
    return _.map(options, (option) => {
      return {
        id: option?.id,
        label: option?.name,
        key: option?.id,
        name: option?.name,
      };
    });
  }

  onFormUpdate(formValue: FormValue) {
    console.log(formValue.getValues());
  }
}
