import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormValue } from 'src/app/shared/modules/forms/models/form-value.model';

import * as _ from 'lodash';
import { formatDateYYMMDD } from 'src/app/pages/data-entry/helpers';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { OuService } from 'src/app/core/services/ou.service';

@Component({
  selector: 'app-ou-registration',
  templateUrl: './ou-registration.component.html',
  styleUrls: ['./ou-registration.component.css'],
})
export class OuRegistrationComponent implements OnInit {
  categories: any;
  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: [],
    batchSize: 400,
    updateOnSelect: true,
    selectedOrgUnitItems: [],
  };
  selectedOrgUnits: Array<any> = [];
  ouFilterIsSet: boolean = true;

  formValues: any = {};
  isOuAdded: boolean = false;
  isOuEdited: boolean = false;
  savingMessage: string;
  formFields: any;
  currentFormData: any = {};
  isFormValid: boolean = false;
  saveOuResponse$: Observable<any>;
  saving: boolean = false;
  group: any;
  configurations: any;
  constructor(
    private dialogRef: MatDialogRef<OuRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private httpClient: NgxDhis2HttpClientService,
    private ouService: OuService
  ) {
    this.group = data?.group;
    this.configurations = data?.configurations;
  }

  ngOnInit(): void {
    this.formFields = [
      {
        id: 'regdate',
        label: 'Date',
        key: 'regdate',
        controlType: 'date',
        name: 'Date of action',
        required: true,
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
        id: 'contactperson',
        label: 'Contact person',
        key: 'contactperson',
        controlType: 'textbox',
        name: 'Contact person',
        required: true,
      },
      {
        id: 'email',
        label: 'Email',
        key: 'email',
        controlType: 'email',
        name: 'Email',
        required: false,
        type: 'email',
      },
      {
        id: 'phoneNumber',
        label: 'Phone number',
        key: 'phoneNumber',
        controlType: 'phoneNumber',
        name: 'Phone number',
        required: false,
        max: 9,
        type: 'tel',
      },
    ];
  }

  onClose(e) {
    e.stopPropagation();
    this.dialogRef.close();
  }

  onFilterUpdate(selections) {
    this.ouFilterIsSet = false;
    this.formValues['parent'] = { value: selections?.items[0]?.id };
    this.selectedOrgUnits = selections?.items;
  }

  onFilterClose(selections) {
    this.ouFilterIsSet = false;
  }

  onToggleOuFilter(e) {
    e.stopPropagation();
    this.ouFilterIsSet = !this.ouFilterIsSet;
  }

  onFormUpdate(formValue: FormValue) {
    this.formValues = { ...this.formValues, ...formValue.getValues() };
    this.isFormValid = formValue.isValid;
  }

  onSave(e) {
    e.stopPropagation();
    const ouDetails = this.getOuInfoFromFormValues(this.formValues);
    // console.log('ouDetails', ouDetails);
    this.saving = true;
    this.saveOuResponse$ = this.httpClient
      .post('organisationUnits', ouDetails)
      .pipe(
        map((response: any) => {
          console.log('ou created', response);
          this.saving = false;
          setTimeout(() => {
            const data = {
              id: this.configurations[this.group?.id]?.groupId,
              attributeValues: [],
              name: this.configurations[this.group?.id]?.name,
              shortName: this.configurations[this.group?.id]?.name,
              translations: [],
              organisationUnits: [{ id: response.response?.uid }],
              userGroupAccesses: [],
              userAccesses: [],
            };
            this.ouService
              .addOuGroupMembers(
                data,
                this.configurations[this.group?.id]?.groupId
              )
              .subscribe((groupMemberResponse) => {
                if (groupMemberResponse) {
                  // assign forms
                  this.savingMessage = 'Saved successfully';
                  setTimeout(() => {
                    this.savingMessage = null;
                    this.formValues = {};
                  }, 1000);
                }
              });
          }, 100);
          return response;
        }),
        catchError((e) => {
          this.saving = false;
          return of(e);
        })
      );

    this.saveOuResponse$.subscribe((response) => {
      // console.log('response', response);
    });
  }

  onEdit(e, ou) {
    e.stopPropagation();
    const ouDetails = this.getOuInfoFromFormValues(this.formValues);
    // console.log('ouDetails', ouDetails);
  }

  getOuInfoFromFormValues(values) {
    let formattedData = {
      attributeValues: [
        {
          value: values?.wards?.value,
          attribute: {
            id: 'BzcqUMIrwTD',
            name: 'Wards count',
          },
        },
        {
          value: (_.filter(values?.zone?.options, {
            key: values?.zone?.value,
          }) || [])[0]?.name,
          attribute: {
            id: 'ToLPJu192tn',
            name: 'Zone',
          },
        },
      ],
      name: values?.name?.value,
      shortName: values?.shortname?.value,
      openingDate: formatDateYYMMDD(values?.regdate?.value),
      parent: {
        id: values?.parent?.value,
      },
      phoneNumber: values?.phoneNumber?.value,
    };
    return formattedData;
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
}
